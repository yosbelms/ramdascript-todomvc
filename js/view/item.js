// Generated by RamdaScript 0.2.1

;(function () {

var d = app.dom

Item = R.curry(function (todo) {
    return d.li({
            className : getItemCls(todo)
        }, [
            d.div({
                    className : 'view'
                }, [
                    d.input({
                            className : 'toggle',
                            type : 'checkbox',
                            checked : todo.completed,
                            onChange : handleItemCheck(todo)
                        }),
                    d.label({
                            className : 'completed',
                            onDoubleClick : handleLabelDoubleClick(todo)
                        }, todo.title),
                    d.button({
                            className : 'destroy',
                            onClick : handleDestroyClick(todo)
                        })
                ]),
            d.input({
                    className : 'edit',
                    value : app.stateGet('editingText'),
                    onChange : handleInputChange,
                    onKeyDown : handleInputKeydown,
                    onBlur : commitChanges
                })
        ])
})

var handleItemCheck = R.curry(function (todo, e) {
    return app.toggle(todo, e.target.checked)
})

var handleDestroyClick = R.curry(function (todo, e) {
    return app.destroy(todo)
})

var isBeingEdited = R.propSatisfies(
    R.curry(function (id) {
        return R.equals(
            app.stateGet('editing'), id)
    }), 'id')

var getItemEditingCls = R.cond([
        [
            isBeingEdited,
            R.always('editing ')
        ],
        [
            R.T,
            R.always('')
        ]
    ])

var getItemCompletedCls = R.cond([
        [
            R.propEq('completed', true),
            R.always('completed ')
        ],
        [
            R.T,
            R.always('')
        ]
    ])

var getItemCls = R.converge(R.concat, [
        getItemCompletedCls,
        getItemEditingCls
    ])

var handleLabelDoubleClick = R.curry(function (todo, e) {
    return app.state(
        R.merge(
            app.state(), {
                'editingText' : todo.title,
                'editing' : todo.id
            }))
})

var handleInputChange = R.pipe(
    R.path([
            'target',
            'value'
        ]), 
    app.stateSet('editingText'))

var commitChanges = function () {
    return app.state(
        R.merge(
            app.state(), {
                editing : null,
                todos : R.map(
                    R.ifElse(
                        R.propEq('id', 
                            app.stateGet('editing')), 
                        R.assoc('title', 
                            app.stateGet('editingText')), 
                        R.identity()), 
                    app.stateGet('todos'))
            }))
}

var cancelChanges = function () {
    return app.stateSet('editing', null)
}

var handleInputKeydown = R.cond([
        [
            R.both(
                R.propEq('keyCode', app.ENTER_KEY), 
                function () {
                    return R.not(
                        R.isEmpty(
                            app.stateGet('editingText')))
                }),
            commitChanges
        ],
        [
            R.propEq('keyCode', app.ESCAPE_KEY),
            cancelChanges
        ]
    ])

app.Item = Item

})()