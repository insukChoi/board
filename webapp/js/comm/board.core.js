var _board = function() {
    this.version 			= 0.1;
    this.cache				= {};
    this.height				= 0;
    this.jobManager		= undefined;
    this.afterOnload		= [];
    this.beforeOnload		= [];
    this.onload				= false;
};
_board.instance						= new _board();
_board.getInstance					= function() 			{ return _board.instance; };
_board.prototype.checkException	= function(e)			{ if (e&&e.onError&&typeof(e.onError)=="function") {e.onError();} else throw e; };
_board.prototype.setJobManager	= function(jm) 		{ this.jobManager = jm; };
_board.prototype.getJobManager	= function() 			{ return this.jobManager; };
_board.prototype.addAfterOnload		= function(fn) 			{
    if (!this.onload) {
        this.afterOnload.push(fn);
    } else {
        fn();
    }
};
_board.prototype.addBeforeOnload		= function(fn) 			{
    if (!this.onload) {
        this.beforeOnload.push(fn);
    } else {
        fn();
    }
};
_board.prototype.getAfterOnload		= function(fn) 			{ return this.afterOnload;	};
_board.prototype.getBeforeOnload		= function(fn) 			{ return this.beforeOnload;	};
_board.prototype.isOnload				= function(b) 				{
    if (b!=undefined) {
        this.onload = b;
    }
    return b;
};


(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    // The base Class implementation (does nothing)
    this.Class = function(){};

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if ( !initializing && this.init ) this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();


/**
 * Job을 관리하는 Manager정의
 */
_boardJobManager = Class.extend({
    init : function() {
        this.jobList = [];
        this.bIsRun	 = false;	// 현재 돌고 있는지
        this.trans	 = false;	// 트렌젝션 처리중인지.
        this.dTime	 = 50;		// 0.05초당 한번씩 실행하도록.
    }, add : function(job) {
        this.jobList.push(job);
        if (!this.isRun()) this.runJob();
    }, start : function() {
        this.trans = true;
    }, stop : function() {
        this.trans = false;
        if (!this.isRun()) this.runJob();
    }, runJob : function() {
        if (this.isRun()) return;
        var _this = this;
        this.isRun(true);
        setTimeout(function() {
            if (!_this.trans && _this.jobList.length > 0) {
                var job = _this.jobList.shift();
                try { job.apply(_this); } catch(e) { alert("Job처리중 오류발생. :: " + e.message + job); throw e; }
                _this.runJob();
            }
            _this.isRun(false);
        }, this.dTime);
    }, isRun : function(b) {
        if (typeof(b)!=undefined) return this.bIsRun;
        else					  					this.bIsRun = b;
    }
});

_board.getInstance().setJobManager(new _boardJobManager());


/**
 * Page에서 실행해야할 Job을 줄세우기 위해 사용한다.
 */
var pageJobs =  _board.getInstance().getJobManager();

var Board = Class.extend({
    init:function() {
        var _r = this;
        try {
            if (this.beforeOnload)this.beforeOnload();
        } catch (e) {
            _board.getInstance().checkException(e);
        }
        $(function() {
            _r._executeOnload();
        });
        /* board.addOnload 함수를 만들어서 onload는 한곳에서 관리하도록 하자.
         if (document.readyState == "complete") {
         _r._executeOnload();
         } else {
         if (window.addEventListener)	window.addEventListener	("load", _r._executeOnload, false);
         else if (window.attachEvent)	window.attachEvent		("onload", _r._executeOnload);
         else									window.onload = _r._executeOnload;
         }
         */
    },beforeOnload:function() {
    },_executeOnload:function() {
        var _r = this;
        try {
            var beforeonload = _board.getInstance().getBeforeOnload();
            for (var i=0;i<beforeonload.length;i++) {
                beforeonload[i]();
            }
            pageJobs.add(function() {
                if (_r.onload)_r.onload();
                if (_r.event) _r.event();
                _board.getInstance().isOnload(true);
            });
            var afteronload = _board.getInstance().getAfterOnload();
            for (var i=0;i<afteronload.length;i++) {
                var fn = afteronload[i];
                pageJobs.add(function() {
                    fn();
                });
            }
        } catch(e) {
            _board.getInstance().checkException(e);
        };
    }, addEvent :function(selector, eventid, fn) {
        $(selector).bind(eventid, function() { try {
            fn.apply(this,arguments);
        } catch (e) {
            _board.getInstance().checkException(e);
        }; });
    }, onload :function() {
    }, event :function() {
    }
});

/**
 * Exception 정의
 */
var Exception = Class.extend({
    init:function(code, msg) {
        this.prototype = Error;
        this.name = "BoardException";
        this.code = code;
        this.msg = msg;
        try {
            throw new Error("");
        } catch (e) {
//			alert("Exception :: stack + "+e.stack);
        }
    },getCode :function() {
        return this.code;
    },getMessage :function() {
        return this.msg;
    },printStackTrace:function() {
        alert("stack track");
    },getMessage:function() {
        return this.msg;
    },onError: function() {
        alert(this.msg);
    }
});
