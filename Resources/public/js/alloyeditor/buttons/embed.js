/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
// **NOTICE:**
// THIS IS AN AUTO-GENERATED FILE
// DO YOUR MODIFICATIONS IN THE CORRESPONDING .jsx FILE
// AND REGENERATE IT WITH: grunt jsx
// END OF NOTICE
YUI.add('ez-alloyeditor-button-embed', function (Y) {
    "use strict";

    var AlloyEditor = Y.eZ.AlloyEditor,
        React = Y.eZ.React,
        ButtonEmbed;

    /**
     * The ButtonEmbed component represents a button to add an embed element.
     *
     * @uses AlloyEditor.ButtonCommand
     * @uses AlloyEditor.ButtonStateClasses
     * @uses eZ.AlloyEditorToolbarConfig.ButtonEmbedDiscoverContent
     *
     * @class eZ.AlloyEditor.ButtonEmbed
     */
    ButtonEmbed = React.createClass({displayName: "ButtonEmbed",
        mixins: [
            AlloyEditor.ButtonCommand,
            AlloyEditor.ButtonStateClasses,
            Y.eZ.AlloyEditorButton.WidgetButton,
            Y.eZ.AlloyEditorButton.ButtonEmbedDiscoverContent,
        ],

        statics: {
            key: 'ezembed'
        },

        getDefaultProps: function () {
            return {
                command: 'ezembed',
                modifiesSelection: true,
                udwTitle: Y.eZ.trans('select.a.content.to.embed', {}, 'onlineeditor'),
                udwContentDiscoveredMethod: '_addEmbed',
            };
        },

        /**
         * Executes the command generated by the ezembed plugin and set the
         * correct value based on the choosen content.
         *
         * @method _addEmbed
         * @param {EventFacade} e the result of the choice in the UDW
         * @protected
         */
        _addEmbed: function (e) {
            var contentInfo = e.selection.contentInfo,
                widget;

            this.execCommand();
            this._setContentInfo(contentInfo);
            widget = this._getWidget().setWidgetContent('');
            this._fireUpdatedEmbed(e.selection);
            widget.setFocused(true);
        },

        render: function () {
            var css = "ae-button ez-ae-labeled-button" + this.getStateClasses();

            return (
                React.createElement("button", {className: css, onClick: this._chooseContent, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "ez-ae-icon ez-ae-icon-embed ez-font-icon"}), 
                    React.createElement("p", {className: "ez-ae-label"}, Y.eZ.trans('embed', {}, 'onlineeditor'))
                )
            );
        },
    });

    AlloyEditor.Buttons[ButtonEmbed.key] = AlloyEditor.ButtonEmbed = ButtonEmbed;
});
