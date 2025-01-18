import * as commons from "./commons.js"

//#10325/#10328 20220630 ADD S FJ)Y.FURUICHI
// ウィンドウタイトル履歴情報クラス
export class WindowTitleHistory
{
    constructor(tabId, title, time) {
        // tabid title が取れなかった場合は空文字を入れる
        if (commons.isUndefinedOrNull(title)) {
            title = "";
        }
        if (commons.isUndefinedOrNull(tabId)) {
            tabId = "";
        }
        this.key_tabId_title = tabId + ":" + commons.sliceWindowTitle(title, 260);
        this.value = {"time":time};
    }
}

// ウィンドウタイトル履歴管理クラス
export class WindowTitleHistoryManager
{
    constructor(maximumHistory) {
        this.maximumHistory = maximumHistory;
        this.histories      = new Map();
    }

    // 指定されたタブIDとウィンドウタイトルの組み合わせが履歴に存在するかどうかを調べる。
    has(key_tabId_title) {
        if (this.histories.has(key_tabId_title)) {
            return true;
        }
        return false;
    }

    // 指定されたウィンドウタイトルを履歴に追加する。
    add(windowTitleHistory) {

        // deleteを試す。履歴になかった場合は空振り。setで新規追加
        // 履歴にあった場合はdeleteしたのちに、追加することで更新処理となる
        this.histories.delete(windowTitleHistory.key_tabId_title);

        // 履歴が最大数以上の場合(更新の場合は、前の処理で消しているため最大数以上にはならない)
        if (this.maximumHistory <= this.histories.size) {
            // 先頭の履歴を削除する
            for (var key of this.histories.keys()) {
                this.histories.delete(key);
                break;
            }
        }

        // 新しいウィンドウタイトルの履歴の末尾に追加する
        this.histories.set(windowTitleHistory.key_tabId_title, windowTitleHistory.value);
    }
}
//#10325/#10328 20220630 ADD E FJ)Y.FURUICHI
