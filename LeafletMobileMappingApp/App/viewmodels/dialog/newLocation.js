define(function () {
    var system = require('durandal/system');
    var previousValues = {};

    var vm = {
        selectOption: selectOption,
        activate: activate,
        entity: ko.observable(),
        options: ['Save', 'Cancel']
    };
    return vm;

    function selectOption(dialogResult) {
        if (dialogResult == 'Save') {
            var modal = this;
            modal.modal.close(true);

        } else if (dialogResult == 'Cancel') {
            this.modal.close();
        }
    }

    function activate(context) {
        return system.defer(function (dfd) {
            if (context && context.entity) {
                //edit note
                previousValues = context.entity;
                vm.entity(context.entity);
            }
            dfd.resolve();
        }).promise();
    }

    //function validate() {
    //    try {
    //        $('.validationError').removeClass('validationError');
    //        if (vm.entity()) {
    //            vm.entity().entityAspect.clearValidationErrors()
    //            var aspect = vm.entity().entityAspect;
    //            aspect.validateEntity();
    //            if (vm.entity().entityAspect.getValidationErrors().length > 0) {
    //                var errors = vm.entity().entityAspect.getValidationErrors();
    //                for (var i = 0; i < errors.length; i++) {
    //                    app.logger.error(errors[i].errorMessage)
    //                    if (errors[i].propertyName) {
    //                        $('.clientNote .' + errors[i].propertyName).addClass('validationError');
    //                    }
    //                }
    //                return false;
    //            }
    //            else {
    //                return true;
    //            }
    //        }
    //        return true;
    //    } catch (e) {
    //        app.logger.error('Exception: ' + e.message);
    //        return false;
    //    }
    //}

});