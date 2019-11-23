var regressionTest = angular.module('regressionTest', []);
const shell = require('shelljs');

function mainController($scope, $http) {

    $scope.execute = () => {
        //se corre cypress automaticamente
        shell.cd(`/Users/adriana.bonilla/Documents/u/palette/node_modules/.bin`);
        shell.exec(`cypress run --spec cypress/integration/test`);
        //se comparan los screenshot creados
        $http.post('/test/compare', {})
            .success(function (data) {
                $scope.executions = data.map(item => parseExecution(item));            
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}
