Backbone.View.prototype.append = function (view, options) {
    options = _.defaults(options || {}, {
        render: true,
        replace: false
    });

    if (!(view instanceof Backbone.View)) {
        throw new Error('View is not a instance of Backbone.View')
    }

    var region = options.region || view.region,
        viewName = options.name || view.cid,
        $container = this.$(region)[0] ? this.$(region) : this.$el,
        addMethod = options.replace ? 'prepend' : 'append';

    if (options.render) {
        view.render();
    }


    $container[addMethod](view.$el);

    view.isAppended = true;
    view.trigger('appended');

    if (options.replace && this.subview(viewName)) {
        this.removeSubview(viewName);
    }
    this.subview(viewName, view);
};
