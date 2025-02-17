/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Zimbra Mail Notifier.
 *
 * The Initial Developer of the Original Code is
 * David GUEHENNEC.
 * Portions created by the Initial Developer are Copyright (C) 2013
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 * Benjamin ROBIN
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

"use strict";

var EXPORTED_SYMBOLS = ["zimbra_notifier_Message", "zimbra_notifier_MessageManager"];

function sanitizedString(text) {
    if (!text) {
        return "";
    }
    var element = document.createElement('span');
    element.innerHTML = text;
    return element.textContent.trim();
}


/**
 * Creates an instance of Message.
 *
 * @constructor
 * @this {Message}
 *
 * @param {String}
 *            id the message id
 * @param {Number}
 *            timestamp the timestamp message date
 * @param {String}
 *            subject the message subject
 * @param {String}
 *            content the message content
 * @param {String}
 *            senderMail the message sender
 * @param {String}
 *            convId the conversation id
 */
var zimbra_notifier_Message = function(id, timestamp, subject, content, senderMail, convId) {
    this.id = id;
    this.date = timestamp ? (new Date(timestamp)) : null;
    this.subject = sanitizedString(subject);
    this.content = sanitizedString(content);
    this.senderEmail = senderMail;
    this.convId = convId;
};

/**
 * Freeze the interface
 */
Object.freeze(zimbra_notifier_Message);

/**
 * Creates an instance of MessageManager.
 * Used to detect new unread message
 *
 * @constructor
 * @this {MessageManager}
 */
var zimbra_notifier_MessageManager = function() {
    this._oldNbMessages = 0;
    this._nbMessages = 0;
    this._tmpNbMessages = 0;

    this._listMessages = [];
    this._tmpListMessages = [];

    this._mapMsgId2IdxList = {};
    this._tmpMapMsgId2IdxList = {};
};

/**
 * Get the messages
 *
 * @this {MessageManager}
 *
 * @return messages
 */
zimbra_notifier_MessageManager.prototype.getMessages = function() {
    return this._listMessages;
};

/**
 * Get the current number of messages
 *
 * @this {MessageManager}
 *
 * @return {Number} Number of messages
 */
zimbra_notifier_MessageManager.prototype.nbMessages = function() {
    return this._nbMessages;
};

/**
 * End of adding messages
 *
 * @this {MessageManager}
 *
 * @return {Number} Number of new message since the last call
 */
zimbra_notifier_MessageManager.prototype.endAddingMessages = function() {
    // Get the number of new messages since the last call
    var diff = this._nbMessages - this._oldNbMessages;
    this._oldNbMessages = this._nbMessages;
    this._nbMessages = this._tmpNbMessages;
    this._tmpNbMessages = 0;

    // Update the list of message from the temporary list...
    this._listMessages = this._tmpListMessages;
    this._tmpListMessages = [];
    this._mapMsgId2IdxList = this._tmpMapMsgId2IdxList;
    this._tmpMapMsgId2IdxList = {};

    return diff;
};

/**
 * Add the message and indicate the number of new messages
 *
 * @this {MessageManager}
 *
 * @param {Message}
 *            msg  The message to add
 * @return {Number} Number of new mail (0 or 1)
 */
zimbra_notifier_MessageManager.prototype.addMessage = function(msg) {
    var nbNewMsg = 0;

    // First check if the message doesn't already exist in temporary list
    var idxList = this._tmpMapMsgId2IdxList[msg.id];
    if (idxList === undefined) {
        // Check if the message is in the old list
        if (this._mapMsgId2IdxList[msg.id] === undefined) {
            nbNewMsg++;
            this._nbMessages++;
        }
        // Add the message to the temporary list
        this._tmpMapMsgId2IdxList[msg.id] = this._tmpListMessages.length;
        this._tmpListMessages.push(msg);
        this._tmpNbMessages++;
    }
    else {
        // Update the message
        this._tmpListMessages[idxList] = msg;
    }

    return nbNewMsg;
};

/**
 * Freeze the interface
 */
Object.freeze(zimbra_notifier_MessageManager);
