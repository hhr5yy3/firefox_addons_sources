define([
        'new_options/storages/localStorageModel',
        'new_options/storages/localStoreModel'
    ],
    function (localStore, StoreMethods) {

        var model = Backbone.Model.extend({
            localStorage: new StoreMethods('Google'),
            changeVisibility: function () {
                this.set({active: !this.get("active")});
            },
            changeUrlsToCheck: function (e) {
                this.set({urls_to_check: e.currentTarget.value});
            },
            changeFunction: function (e, m) {
                var functions = this.get('functions');
                functions[m.get('name')].active = m.get('active');
                this.set({functions: functions});
            }
        });
        model.prototype.sync = localStore;

        return model;
    });

