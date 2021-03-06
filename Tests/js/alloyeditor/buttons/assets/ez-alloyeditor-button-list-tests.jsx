/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ez-alloyeditor-button-list-tests', function (Y) {
    var renderTest, clickTest,
        AlloyEditor = Y.eZ.AlloyEditor,
        ReactDOM = Y.eZ.ReactDOM,
        React = Y.eZ.React,
        Assert = Y.Assert, Mock = Y.Mock;

    renderTest = new Y.Test.Case({
        name: "eZ AlloyEditor list button render test",

        setUp: function () {
            this.container = Y.one('.container').getDOMNode();
            this.editor = {};
        },

        tearDown: function () {
            ReactDOM.unmountComponentAtNode(this.container);
            delete this.editor;
        },

        "Should render a button": function () {
            var button;

            button = ReactDOM.render(
                <AlloyEditor.ButtonList editor={this.editor} />,
                this.container
            );

            Assert.isNotNull(
                ReactDOM.findDOMNode(button),
                "The button should be rendered"
            );
            Assert.areEqual(
                "BUTTON", ReactDOM.findDOMNode(button).tagName,
                "The component should generate a button"
            );
        },
    });

    clickTest= new Y.Test.Case({
        name: "eZ AlloyEditor list button click test",

        setUp: function () {
            var nat = new Mock();

            this.container = Y.one('.container');
            this.editor = new Mock();
            Mock.expect(this.editor, {
                method: 'get',
                args: ['nativeEditor'],
                returns: nat,
            });
            Mock.expect(nat, {
                method: 'execCommand',
                args: ['eZAddContent', Mock.Value.Object],
                run: function (command, data) {
                    Assert.areEqual(
                        data.tagName, 'ul',
                        "A list should be generated"
                    );
                    Assert.areEqual(
                        data.content, '<li></li>',
                        "The list should contain an empty item"
                    );
                    Assert.areEqual(
                        data.focusElement, 'li',
                        "The empty item should get the focus"
                    );
                }
            });
            Mock.expect(nat, {
                method: 'selectionChange',
                args: [true],
            });
            Mock.expect(nat, {
                method: 'fire',
                args: ['actionPerformed', Mock.Value.Object],
            });
        },

        tearDown: function () {
            ReactDOM.unmountComponentAtNode(this.container.getDOMNode());
            delete this.editor;
        },

        "Should execute the eZAddContent command": function () {
            var button;

            button = ReactDOM.render(
                <AlloyEditor.ButtonList editor={this.editor} />,
                this.container.getDOMNode()
            );

            this.container.one('button').simulate('click');
        },
    });

    Y.Test.Runner.setName("eZ AlloyEditor list button tests");
    Y.Test.Runner.add(renderTest);
    Y.Test.Runner.add(clickTest);
}, '', {requires: ['test', 'node', 'node-event-simulate', 'ez-alloyeditor-button-list']});
