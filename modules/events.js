define(function() {

    // Events
    // -----------------
    // From:
    // - https://raw.github.com/aralejs/events/master/src/events.js
    // Thanks to:
    // - https://github.com/documentcloud/backbone/blob/master/backbone.js
    // - https://github.com/joyent/node/blob/master/lib/events.js


    // Regular expression used to split event strings
    var eventSplitter = /\s+/


    // A module that can be mixed in to *any object* in order to provide it
    // with custom events. You may bind with `on` or remove with `off` callback
    // functions to an event; `trigger`-ing an event fires all callbacks in
    // succession.
    //
    // var object = new Events();
    // object.on('expand', function(){ alert('expanded'); });
    // object.trigger('expand');
    //
    function Events() {}


    // Bind one or more space separated events, `events`, to a `callback`
    // function. Passing `"all"` will bind the callback to all events fired.
    Events.prototype.on = function(events, callback, context) {
        var cache, event, list;
        if (!callback) return this;

        cache = this.__events || (this.__events = {});
        events = events.split(eventSplitter);

        while (event = events.shift()) {
            list = cache[event] || (cache[event] = []);
            list.push({
                callback:callback,
                context:context
            });
        }

        return this;
    };
    
    
    Events.prototype.once = function(events, callback, context) {
        var that = this;
        var cb = function() {
            that.off(events, cb);
            callback.apply(context || that, arguments);
        };
        return this.on(events, cb, context);
    };


    // Remove one or many callbacks. If `context` is null, removes all callbacks
    // with that function. If `callback` is null, removes all callbacks for the
    // event. If `events` is null, removes all bound callbacks for all events.
    Events.prototype.off = function(events, callback, context) {
        var cache, event, list, i;

        // No events, or removing *all* events.
        if (!(cache = this.__events)) return this;
        if (!(events || callback || context)) {
            delete this.__events;
            return this;
        }

        events = events ? events.split(eventSplitter) : keys(cache);

        // Loop through the callback list, splicing where appropriate.
        while (event = events.shift()) {
            list = cache[event];
            if (!list) continue;

            if (!(callback || context)) {
                delete cache[event];
                continue;
            }
            for(i = list.length - 1; i >= 0; i -= 1){
                if(!(callback && list[i].callback !== callback || context && list[i].context !== context)){
                    list.splice(i, 1);
                }
            }
        }

        return this;
    }


    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    Events.prototype.trigger = function(events) {
        var cache, event, all, list, i, len, rest = [],
            args;
        if (!(cache = this.__events)) return this;

        events = events.split(eventSplitter);

        // Fill up `rest` with the callback arguments. Since we're only copying
        // the tail of `arguments`, a loop is much faster than Array#slice.
        for (i = 1, len = arguments.length; i < len; i++) {
            rest[i - 1] = arguments[i];
        }

        // For each event, walk through the list of callbacks twice, first to
        // trigger the event, then to trigger any `"all"` callbacks.
        while (event = events.shift()) {
            // Copy callback lists to prevent modification.
            if (all = cache.all) all = all.slice();
            if (list = cache[event]) list = list.slice();

            // Execute event callbacks.
            if (list) {
                for (i = 0, len = list.length; i < len; i += 1) {
                    list[i].callback.apply(list[i].context || this, rest);
                }
            }

            // Execute "all" callbacks.
            if (all) {
                args = [event].concat(rest);
                for (i = 0, len = all.length; i < len; i += 2) {
                    all[i].callback.apply(all[i].context || this, args);
                }
            }
        }

        return this;
    }


    return Events;
})