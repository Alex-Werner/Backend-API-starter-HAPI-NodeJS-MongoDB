var ErrorHelper = {
    displayCatch:function(response, e, message){
        response.message= e.message;
        response.error={
            stack: e.stack.split('\n').map(function(a){
                return a;
            }),
            code: e.code,
            errno: e.errno,
            syscall: e.syscall
        };
        response.success=false;
        return response;
    },
    displayTrace:function () {
        var e = new Error('dummy');
        var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
            .split('\n');
        return stack[stack.length - 1];
    },
    handleUnhandledRejection:function(){
        cl('Event attached : handleUnhandledRejection');
        /* When a Promise's reject is not handler, fire this */
        process.on("unhandledRejection", function (reason, promise) {
            //cl('unhandledRejection', promise);
            promise
                .catch(function (e) {
                    console.log('\n unhandledRejection',e);
                    //Here we can handle some error unhandled on Promise's reject
                });
        });

    },
    handleUncaughtException:function(){
        cl('Event attached : uncaughtException');
        process.on('uncaughtException', function (err) {
            console.log(err);
        });
    },
    handleRejectionHandled:function(){
        cl('Event attached : handleRejectionHandled');

        /* When a promise's reject became from unhandled to handled, fire this
         *  can be used to implement a debugger that will show a list of unhandled promise rejections updated in real time as promises become handled.
         * */
        process.on("rejectionHandled", function (promise) {
            //cl('Rejection Handled', promise);
            promise
                .catch(function (e) {
                    console.log('\n rejectionHandled',e);
                    //Here we can handle some error unhandled on Promise's reject
                });
        });
    },
    handleError:function(){
        cl('Event attached : error');

        process.on('error', function (err) {
            cl();
            console.log(err);
        });
    }
};
module.exports = ErrorHelper;