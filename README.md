# Backbone Patterns
Backbone Patterns is a library intended to super charge your Backbone application. This is a library and not a framework, 
it will not provide code structuring of any kind.
 
## What does it do?
- [It provides messaging channels, courtesy of Backbone.Radio](#backboneradio)
- [Handles view lifecycle management](#viewlifecyclemanagement)
- [Command, PubSub & Request/Reply](#commandpubsubrequestreply)
- [Supercharged Backbone.View's](#superchargedbackboneviews)

## Backbone.Radio
Backbone Patterns utilizes Backbone.Radio from the MarionetteJS team. [Backbone.Radio documentation](https://github.com/marionettejs/backbone.radio)

## View lifecycle management
With plain 'ol Backbone managing your views is something you need to handle yourself. Leaving views "dangling" might cause
some serious memory leaks. We fixed this problem by allowing you to register a subview within your parent View. Calling view.remove()
on your parent View triggers the remove() function on all registered subviews.

We also improved the remove function. All the references stored inside a View are deleted, making it easier to GC (Garbage Collect).

## Command, PubSub & Request/Reply
Design patterns are the heart of every well written application. The Command, PubSub & Request/Reply patterns are deeply 
integrated within Backbone Patterns. See the API section for more information

## Supercharged Backbone.Views
We added some extra functions to the default Backbone.View, making it more robust and easier to use in larger projects.

## API
- [Backbone.View](#backboneview)
  - [append](#appendview--options)
  - [channel](#channelname)
  - [optionNames](#optionnames-array)
  - [prepend](#prependview--options)
  - [renderMethod](#rendermethod-string)
  - [subscriptions](#subscriptions-object)
  - [template](#template-function)
- [Backbone.Class](#backboneclass)
- [Backbone.Collection](#backbonecollection)
  - [abort](#abort)
  - [fetch](#fetchoptions)
- [Backbone.Model](#backbonemodel)
  - [abort](#abort-1)
  - [fetch](#fetchoptions-1)
  - [save](#savekey-val-options)
- [Backbone.Router](#backbonerouter)
  - [execute](#executecallback-args)
- [Backbone.mediator](#backbonemediator)
- [Backbone.decorators](#backbonedecorators)
  - [Backbone.decorators.Command](#backbonedecoratorscommand)
  - [Backbone.decorators.PubSub](#backbonedecoratorspubsub)
  - [Backbone.decorators.RequestResponse](#backbonedecoratorsrequestresponse)
  
    
 
## Backbone.View
### append(view [, options])
Renders and appends the passed View to the Views element. The appended views is also registered as a subview.
Triggers a 'appended' event on the subview.

```js
Backbone.View.extend({
    render: function () {
        this.append(new SubView(), {
            region: '.my-region',
            render: true,
            replace: true,
            name: 'my-subview',
            addMethod: 'append'
        });
    }
});
```

- [options.region](#optionsregion)
- [options.render](#optionsrender)
- [options.replace](#optionsreplace)
- [options.name](#optionsname)
- [options.addMethod](#optionsaddmethod)

#### options.region
*Default is the root of the parent view.* 

##### Supported values
- QuerySelector
- DOM element
- jQuery element

#### options.render (Boolean)
*Default is true.* 
Passing false will not call the render() function on the subview

#### options.replace (Boolean)
*Default is false.* 
If you try to append a subview with a name that is already registered a Error is thrown.
Passing true will overwrite (and remove) a already registered subview with the same name.

#### options.name (String)
*Default is the views cid.* 

#### options.addMethod (String)
*Default is 'append'*
You can overwrite the method used to append the subview. 


### channel(name)
Returns a [Backbone.Radio.Channel](https://github.com/marionettejs/backbone.radio/tree/v0.9.0#channels)

```js
Backbone.View.extend({
    intialize: function () {
        this.channel('my-channel').request('user');
    }
});
```

##### Provides a interface to
- [Backbone.Radio.Commands](https://github.com/marionettejs/backbone.radio/tree/v0.9.0#backboneradiocommands)
- [Backbone.Radio.Requests](https://github.com/marionettejs/backbone.radio/blob/master/README.md#requests)

### optionNames (Array)
An array with keys representing variables that will be picked from the instantiation object and added to view.

```js
var MyView = Backbone.View.extend({
    optionNames: ['myVar']
});
var view = new MyView({
    myVar: 'test'
});
view.myVar; //test
```

### prepend(view [, options])
Similar to [append()](#append) but prepends instead of appending. See [append()](#append) for more info.

### renderMethod (String)
*Default is append* You can overwrite the method used to append the template.


### subscriptions (Object)
Like the Backbone events object, the subscriptions hash allows you to specify PubSub events in which you are interested.
The listeners are automatically removed when removing the view.

```js
Backbone.View.extend({
    subscriptions: {
        "window": {
            "resize": "handleResize"
        }
    },
    handleResize: function (event) {}
});
``` 

### template (Function)
The template which needs to be rendered by the view. Because of the async nature of some templating libraries, a 'render-complete' 
event is fired when the template is done rendering. The innerHTML of the template is added to the view. 


```js
Backbone.View.extend({
    template: _.template("hello: <%= name %>"),
    renderMethod: 'append'
});
```

## Backbone.Class
Backbone.Class is a simple Backbone object providing you with Backbone's way of inheritance.

```js
Backbone.Class.extend({
    initialize: function () {}
});
```

## Backbone.Collection
We have made a few tweaks to Backbone.Collection

### abort()
Cancel an ongoing XHR request

### fetch([options])
Fetch now returns a promise which is resolved with the collection as attribute. 

```js
var collection = new Backbone.Collection();
collection.fetch().then(function (collection) {
    console.log(collection);
});
collection.xhr; //Original XHR request
```

## Backbone.Model
We have made a few tweaks to Backbone.Model

### abort()
Cancel an ongoing XHR request

### fetch([options])
Fetch now returns a promise which is resolved with the model as attribute. 

```js
var model = new Backbone.Model();
model.fetch().then(function (model) {
    console.log(model);
});
model.xhr; //Original XHR request
```

### save(key, [val, options])
Save now returns a promise which is resolved with the model as attribute. 

```js
var model = new Backbone.Model();
model.save({key: 'value'}).then(function (model) {
    console.log(model);
});
model.xhr; //Original XHR request
```

## Backbone.Router
### execute(callback[, args])
We've added two events 'pre-route' & 'post-route'

## Backbone.mediator
### channel(name)
Returns a [Backbone.Radio.Channel](https://github.com/marionettejs/backbone.radio/tree/v0.9.0#channels)

```js
Backbone.mediator.channel('my-channel').request('user');
```

## Backbone.decorators
With these decorators you can extend every object with PubSub, Command & Request/Response pattern. 

### Backbone.decorators.Command
```js
var obj = {};
_.extend(obj, Backbone.decorators.Command);
```

### Backbone.decorators.PubSub
```js
var obj = {};
_.extend(obj, Backbone.decorators.PubSub);
```

### Backbone.decorators.RequestResponse
```js
var obj = {};
_.extend(obj, Backbone.decorators.RequestResponse);
```