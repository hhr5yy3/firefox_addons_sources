(function()
{
    /// Imported from other modules.
    let back, crypto, CURRENT_VERSION, events, front, tree;

    /// Returns a JSON object containing encrypted bookmarks' data.
    async function export_encrypted_data()
    {
        const data = await back.load();
        if (data === null) { return null; }

        data.version = CURRENT_VERSION;

        return data;
    }
    /// Returns a JSON object containing plaintext bookmarks' data.
    async function export_plain_data()
    {
        if (!front.exists())
        {
            return Promise.reject(new Error("Cannot export plain data while locked."));
        }
        return tree.prune(await front.get_tree())
    }

    /// Composes the title for the folder to host imported bookmarks.
    function get_import_folder_title()
    {
        const today = new Date();
        const dd    = today.getDate();
        const mm    = today.getMonth() + 1;
        const yyyy  = today.getFullYear();

        return browser.i18n.getMessage("import_folder_title", [dd, mm, yyyy]);
    }
    /// Decrypts the specified bookmark data using the specified key and imports it to the front.
    async function import_encrypted_data(data, key)
    {
        if (!front.exists())
        {
            return Promise.reject(new Error("Cannot import data while locked."));
        }
        if (data.version.release < 13)
        {
            data =
            {
                bookmarks: data,
                is_compressed: false
            };
        }
        return import_plain_data(await back.read_from(data, key));
    }
    /// Imports the specified bookmark data to the front.
    async function import_plain_data(bookmarks)
    {
        if (!front.exists())
        {
            return Promise.reject(new Error("Cannot import data while locked."));
        }
        const source = bookmarks;
        const target = await browser.bookmarks.create({
            parentId: front.get_id(),
            title: get_import_folder_title()
        });
        try
        {
            const total_node_count = tree.compute_size(source);
            let created_node_count = 1;

            function emit_progress_event()
            {
                events.global.emit("import-status-update",
                {
                    index:   created_node_count,
                    current: created_node_count,
                    total:   total_node_count
                });
            }

            emit_progress_event();
            await tree.duplicate(source, target,
                /* node-creation callback: */ () =>
                {
                    created_node_count += 1;
                    emit_progress_event();
                }
            );
        }
        catch (error)
        {
            // Undo any partial progress:
            browser.bookmarks.remove(target.id);
            throw error;
        }
    }

    define(["scripts/background/bookmarks_manager/back",
            "scripts/background/bookmarks_manager/front",
            "scripts/background/bookmarks_manager/tree_utilities",
            "scripts/meta/version",
            "scripts/utilities/cryptography",
            "scripts/utilities/events"],
           (back_module, front_module, tree_module,
            version_module, cryptography_module, events_module) =>
           {
                back = back_module;
                CURRENT_VERSION = version_module.CURRENT;
                front = front_module;
                tree = tree_module;
                crypto = cryptography_module;
                events = events_module;

                return  {
                            export_encrypted_data: export_encrypted_data,
                            export_plain_data:     export_plain_data,

                            import_encrypted_data: import_encrypted_data,
                            import_plain_data:     import_plain_data
                        };
           });
})();
