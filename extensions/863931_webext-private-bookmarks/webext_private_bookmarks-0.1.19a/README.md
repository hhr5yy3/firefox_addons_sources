## Summary

This extension enables a special password-protected bookmark folder. The folder's contents persist in local storage and are encrypted with the user's password of choice.

## Details
Let us refer to the persistent data in storage as the "back" and to the actual bookmark tree node representing its root in the browser as the "front". To unlock the back and create the front, the user must supply his/her password. Once authenticated, the back's contents are decrypted and duplicated in a newly created front. The user is then free to add/remove nodes to the front, and when ready to lock it again. Whenever the front's contents change, they are encrypted and saved to the back, overwriting previous data in storage. When locked, the front is removed from the browser's bookmark collection altogether. A hash of the user's password is only ever stored in memory from the moment of unlocking up until locking again (pending garbage collection).

### Implicit locking

There are several cases that induce a locking implicitly:
 * When the front folder is deleted unexpectedly.
 * When the extension's privacy context setting is set to "private" and the user exits private browsing. A private browsing "exit" is when the last private window is closed.
 * Ideally, we would like to implicitly-lock when the extension is suspended, but Firefox is missing some functionality for that at this time. Therefore, if the browser is closed while private bookmarks are unlocked, the next time it is opened we make sure to delete the leftover front immediately.

## License

[MIT](LICENSE.txt)
