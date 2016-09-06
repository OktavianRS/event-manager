angular.module('eventManager')
    .controller('mailerTemplateCtrl', ['$scope', '$state', 'url', '$timeout', '$mdDialog', 'crudModel', 'templateModel',
          function($scope, $state, url, $timeout, $mdDialog, crudModel, templateModel) {
        $scope.tempUrl = 'template';
        $scope.template = null;
        $scope.visible = true;

        $.FroalaEditor.DefineIcon('insert', {NAME: 'user-plus'});
        $.FroalaEditor.DefineIcon('preview', {NAME: 'eye'});
        $.FroalaEditor.DefineIcon('unsubscribe', {NAME: 'times-circle'});
        $.FroalaEditor.DefineIcon('border', {NAME: 'th'});
        $.FroalaEditor.RegisterCommand('insert', {
          title: 'Insert recipient name',
          type: 'dropdown',
          focus: false,
          undo: false,
          refreshAfterCallback: true,
          options: {
            'fl': 'First name and last name',
            'f': 'Only first name',
            'l': 'Only last name'
          },
          callback: function(cmd, val) {
            switch(val) {
              case 'fl':
                this.html.insert('{RECIPIENT}');
                break;
              case 'f':
                this.html.insert('{FIRST_NAME}');
                break;
              case 'l':
                this.html.insert('{LAST_NAME}');
                break;
            }
          }
        });

        $.FroalaEditor.RegisterCommand('unsubscribe', {
          title: 'Unsubscribe link',
          focus: false,
          undo: false,
          refreshAfterCallback: true,
          callback: function() {
            this.html.insert('<a href="{UNSUBSCRIBE}">unsubscribe</a>');
          }
        });

        $.FroalaEditor.RegisterCommand('preview', {
          title: 'Preview template',
          focus: false,
          undo: false,
          refreshAfterCallback: true,
          callback: function() {
            $mdDialog.show({
              controller: "templatePreviewModalCtrl",
              templateUrl: 'components/templateModal/templateModal.html',
              parent: angular.element(document.body),
              clickOutsideToClose: true,
              locals: {
                template: $scope.template
              }
            });
          }
        });

        $.FroalaEditor.RegisterCommand('border', {
          title: 'remove/add table border',
          focus: false,
          undo: false,
          refreshAfterCallback: true,
          callback: function() {
            var tabel = this.$el.find(".fr-selected-cell").parent().parent().parent();
            if(typeof tabel.attr('cellspacing')==='undefined' ){
              tabel.attr("border", 0);
              tabel.attr("cellpadding", 0);
              tabel.attr("cellspacing", 0);
            } else {
              tabel.removeAttr("border");
              tabel.removeAttr("cellpadding");
              tabel.removeAttr("cellspacing");
            }
          }
        });

        var butonsToolbar = [
          'fullscreen',
          '|',
          'bold',
          'italic',
          'underline',
          'strikeThrough',
          '|',
          'paragraphFormat',
          'fontFamily',
          'fontSize',
          'align',
          'color',
          '|',
          'insertLink',
          'insertTable',
          'insertImage',
          '|',
          'formatOL',
          'formatUL',
          '|',
          'insert',
          'unsubscribe',
          'html',
          'preview'
        ];

        $scope.froalaOptions = {

          toolbarSticky: false,
          heightMin: 400,
          toolbarButtonsMD: butonsToolbar,
          toolbarButtonsSM: butonsToolbar,
          toolbarButtonsXS: butonsToolbar,
          toolbarButtons: butonsToolbar,

          tableEditButtons:[
            'tableHeader',
            'tableRemove',
            '|',
            'tableRows',
            'tableColumns',
            'tableStyle',
            'border',
            '-',
            'tableCells',
            'tableCellBackground',
            'tableCellVerticalAlign',
            'tableCellHorizontalAlign',
            'tableCellStyle'
          ],

          imageUploadParam: 'image',
          imageUploadURL: url.template.uploadImage,
          imageUploadParams: {'id': $scope.stateParams.id},
          imageAllowedTypes: ['jpeg', 'jpg', 'png'],
          imageInsertButtons: ['imageUpload', 'imageByURL'],
        };

        $scope.viewTemplate = function(templateId, ev) {
          $mdDialog.show({
            controller: "templateModalCtrl",
            templateUrl: 'components/templateModal/templateModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
              templateId: templateId
            }
          });

        };

        crudModel.Read($scope.tempUrl, {id: $scope.stateParams.id}, function(data) {
          $scope.template = data.model;
        });

        $scope.save = function() {
          $scope.visible = false;
          $('#froala-editor').froalaEditor("codeView.toggle");
          $timeout(function() {
            crudModel.Update($scope.tempUrl, {id: $scope.stateParams.id, name: $scope.template.name, content: $scope.template.content}, function() {
              $('#froala-editor').froalaEditor('destroy');
              $state.go('mailerTemplates');
            })
          }, 100)
        }
      }
    ]);