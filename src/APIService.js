angular.module('APIModule', ['pascalprecht.translate'])
.config(function($translateProvider) {
    'use strict';

   
    })
     .factory('APIService', function($http, ConfigurationService, $q, $log, $resource, $cacheFactory, User) {
        'use strict';

        var initDefer = $q.defer();

        var apiServerBaseUrl = '';
        var assetsServerBaseUrl = '';

        ConfigurationService.initialized.then(function(){
            apiServerBaseUrl = ConfigurationService.getKey('apiServerBaseUrl');
            assetsServerBaseUrl = ConfigurationService.getKey('assetsServerBaseUrl');

            initDefer.resolve();
        });

        //we define it as function and not variable because it needs to be returned as reference
        function ACTION() {
            return {
                /* For using example in bottom massage directive replace the first wrong login ACTION with the correct one.
                 In login HTML there is a <bottom-message></bottom-message> element that show en error in login. */
                //login:  {url: 'assets/mocks1/wrong-login-user.json', method: 'get'},
                //-------- user management -------------
                login : { url: apiServerBaseUrl + '/public/user/login' , method: 'post', requireToken: false},
                createAccount: { url: apiServerBaseUrl + '/public/user/createaccount' , method: 'post', requireToken: false},
                validateEmailExists: {url: apiServerBaseUrl + '/public/user/email/exists', method: 'get', requireToken: false},
                validateEmailExistsWithId: {url: apiServerBaseUrl + '/user/email/exists', method: 'get', requireToken: true},
                registerUser: { url: apiServerBaseUrl + '/wfo/user/register' , method: 'post', requireToken: true},
                getAllUsers: { url: apiServerBaseUrl + '/wfo/user' , method: 'get', requireToken: true},
                getFeatures: {url: apiServerBaseUrl + '/config/toggledFeatures', method: 'get', requireToken: true},
                resetUserPassword: {url: apiServerBaseUrl + '/user/resetpassword', method: 'post', requireToken: true},
                resetUserPasswordAfterRecover: {url: apiServerBaseUrl + '/public/user/resetPassword', method: 'post', requireToken: false},
                inviteUser: { url: apiServerBaseUrl + '/user/invite' , method: 'post', requireToken: true},
                resolveInvitationToken: { url: apiServerBaseUrl + '/public/user/resolveInvitationToken' , method: 'post', requireToken: false},
                resolveRecoverPasswordToken: { url: apiServerBaseUrl + '/public/user/resolveForgotPasswordToken' , method: 'post', requireToken: false},
                activateUser: { url: apiServerBaseUrl + '/public/user/activate' , method: 'post', requireToken: true},
                sendRecoverPasswordMessage: { url: apiServerBaseUrl + '/public/user/sendRecoverPassword' , method: 'post', requireToken: false},
                updateUser: { url: apiServerBaseUrl + '/wfo/user/update' , method: 'post', requireToken: true},
                refreshToken: { url: apiServerBaseUrl + '/user/refreshtoken' , method: 'get', requireToken: true},
                getMockUserList: {url: 'assets/mocks/userList.json', method: 'get'},
                importUsers: {url: apiServerBaseUrl + '/user/upload/csv/users'},
                deleteUser: { url: apiServerBaseUrl + '/user/delete' , method: 'post', requireToken: true},
                changeUserPassword: { url: apiServerBaseUrl + '/user/changePassword' , method: 'post', requireToken: true},
                getUserInfo: {url: apiServerBaseUrl + '/user/current/generalinfo', method: 'get', requireToken: true},
                getUserSettings: {url: apiServerBaseUrl + '/user/settings', method: 'get', requireToken: true},
                saveUserSettings: {url: apiServerBaseUrl + '/user/settings', method: 'post', requireToken: true},
                getPermissions: {url: apiServerBaseUrl + '/user/permissions', method: 'get', requireToken: true},
                sendContactUsEmail: {url: apiServerBaseUrl + '/public/user/contactUs', method: 'post', requireToken: false},
                //-------- employee groups -------------
                getAllEmployeeGroups: { url: apiServerBaseUrl + '/user/groups' , method: 'get', requireToken: true},
                //addEmployeeGroup: { url: apiServerBaseUrl + '/user/groups' , method: 'post', requireToken: true},
                addOrUpdateEmployeeGroup: { url: apiServerBaseUrl + '/user/groups' , method: 'put', requireToken: true},
                deleteEmployeeGroup: { url: apiServerBaseUrl + '/user/groups' , method: 'delete', requireToken: true},
                validateGroupName: { url: apiServerBaseUrl + '/user/groups/validateGroupName' , method: 'get', requireToken: true},
                getAssignedUsers: { url: apiServerBaseUrl + '/user/groups/getAssignedUsers' , method: 'post', requireToken: true},
                getUnassignedUsers: { url: apiServerBaseUrl + '/user/groups/getUnassignedUsers' , method: 'post', requireToken: true},
                setUsersToGroup: { url: apiServerBaseUrl + '/user/groups/setUsersToGroup' , method: 'get', requireToken: true},
                getTimezoneList: {url: 'assets/timezones.json', method: 'get'},
                //-------- skills ---------
                getSkills: {url: apiServerBaseUrl + '/wfo/user/skills', method: 'get', requireToken: true, isArray: false},
                addSkill: {url: apiServerBaseUrl + '/wfo/user/skills', method: 'post', requireToken: true},
                deleteSkill: {url: apiServerBaseUrl + '/wfo/user/skills', method: 'delete', requireToken: true},
                //updateSkill: {url: 'assets/mocks/skillsUpdate.json', method: 'put', requireToken: true},
                updateSkill: {url: apiServerBaseUrl + '/wfo/user/skills', method: 'put', requireToken: true},
                getSkillUsers: {url: apiServerBaseUrl + '/wfo/user/skills/users', method: 'get', requireToken: true},
                getUserSkills: {url: 'assets/mocks/userSkills.json', method: 'get', requireToken: true},
                setUserSkills: {url: '', method: 'put', requireToken: true},
                //-------- availability ----------
                getUserAvailability: {url: apiServerBaseUrl + '/wfo/user/:userId/availability', method: 'get', requireToken: true},
                //-------- activity codes --------
                activityCodes : { url:  apiServerBaseUrl + '/activity-codes', method: 'get', requireToken: true },
                activityCodeCategories: {url: apiServerBaseUrl + '/activity-code-categories', method: 'get', requireToken: true},
                createActivityCode: {url: apiServerBaseUrl + '/activity-codes', method: 'post', requireToken: true},
                deleteActivityCode: {url: apiServerBaseUrl + '/activity-codes/:activityCodeId', method: 'delete', requireToken: true},
                deleteMultipleActivities: {url: apiServerBaseUrl + '/activity-codes/delete', method: 'post', requireToken: true},
                updateActivityCode: {url: apiServerBaseUrl + '/activity-codes', method: 'put', requireToken: true},
                //-------- acd Activities Mapping --------
                getActivitiesMapping: {url: apiServerBaseUrl + '/activity-codes/event-mapping', method: 'get', requireToken: true},
                addOrUpdateActivityMapping: {url: apiServerBaseUrl + '/activity-codes/event-mapping', method: 'post', requireToken: true},
                deleteActivitiesMapping: {url: apiServerBaseUrl + '/activity-codes/event-mapping', method: 'delete', requireToken: true},
                //-------- schedules ---------
                schedules : { url:  apiServerBaseUrl + '/schedules/search', method: 'post', requireToken: true },
                saveSchedules : { url: apiServerBaseUrl + '/schedules', method: 'post', requireToken: true },
                publishSchedules : { url: apiServerBaseUrl + '/schedules/publish', method: 'post', requireToken: true },
                getDateStatus : { url: apiServerBaseUrl + '/schedules/published-dates', method: 'post', requireToken: true },
                saveAndPublish : { url: apiServerBaseUrl + '/schedules/saveandpublish', method: 'post', requireToken: true },
                //getDateStatus : { url: 'assets/mocks/daysStatus.json', method: 'get', requireToken: true, isArray: true },
                computedValues: { url: apiServerBaseUrl + '/schedules/computed-values', method: 'post', requireToken: true },
                userSchedule: {url: apiServerBaseUrl + '/schedules/user/:userId?start=:start&end=:end', method: 'get', requireToken: true},
                //-------- scheduler jobs ---------
                alljobs : { url:  apiServerBaseUrl + '/schedule-generator-job', method: 'get', requireToken: true },
                getjob : { url:  apiServerBaseUrl + '/schedule-generator-job/:jobid', method: 'get', requireToken: true },
                submitjob : { url:  apiServerBaseUrl + '/schedule-generator-job', method: 'post', requireToken: true },
                getIsSchedulesExist: { url:  apiServerBaseUrl + '/schedules/exist', method: 'get', requireToken: true },
                //-------- account -----------
                getAccountInfo: { url: apiServerBaseUrl + '/organization' , method: 'get', requireToken: true},
                updateAccountInfo: { url: apiServerBaseUrl + '/organization' , method: 'post', requireToken: true},
                //-------- weekly rules --------
                createOrUpdateWeeklyRules  : { url:  apiServerBaseUrl + '/schedules/weekly-rule', method: 'post', requireToken: true },
                getWeeklyRules : { url:  apiServerBaseUrl + '/schedules/weekly-rule', method: 'get', requireToken: true },
                deleteWeeklyRules : { url:  apiServerBaseUrl + '/schedules/weekly-rule/delete', method: 'post', requireToken: true },
                //---------daily rules----------
                //getDailyRules : { url:  'assets/mocks/mockedDailyRules.json', method: 'get', requireToken: true }
                getDailyRules : { url:  apiServerBaseUrl + '/schedules/daily-rule', method: 'get', requireToken: true },
                createOrUpdateDailyRules : { url:  apiServerBaseUrl + '/schedules/daily-rule', method: 'post', requireToken: true },
                deleteDailyRules : { url:  apiServerBaseUrl + '/schedules/daily-rule/delete', method: 'post', requireToken: true },
                //-------- forecast data --------
                getForecastData : { url: 'assets/mocks/forecastData.json', method: 'get' },
                getImportForecastJobs : { url: apiServerBaseUrl + '/schedules/forecast/importJobs', method: 'get', requireToken: true},
                importForecastData: {url: apiServerBaseUrl + '/schedules/forecast'},
                isForecastDataExist: { url: apiServerBaseUrl + '/schedules/forecast/doesforcastexist', method: 'post', requireToken: true},
                getForcastDataForChart: {url: apiServerBaseUrl + '/schedules/forecast/forecastDaily', method: 'get', requireToken: true},
                //-------- groups --------
                getGroups : { url: apiServerBaseUrl + '/group', method: 'get', requireToken: true},
                addGroup: { url: apiServerBaseUrl + '/group', method: 'post', requireToken: true},
                updateGroup: { url: apiServerBaseUrl + '/group', method: 'put', requireToken: true},
                getGroupUsers: { url: apiServerBaseUrl + '/group/users', method: 'post', requireToken: true},
                deleteGroups: { url: apiServerBaseUrl + '/group/delete' , method: 'post', requireToken: true},
                checkGroupExistenceByName: { url: apiServerBaseUrl + '/group/exists' , method: 'post', requireToken: true},
                //-------- executor -------
                submitFormExecution: {url: apiServerBaseUrl + '/form-executor/execute', method: 'post', requireToken: true},
                //--------- my dashboard ------------
                getDashboardData: { url: apiServerBaseUrl + '/dashboard/userconfig' , method: 'get', requireToken: true},
                getMockDashboardData: {url: 'assets/mocks/dashboardData.json', method: 'get'},
                saveDashboardData: { url: apiServerBaseUrl + '/dashboard/userconfig' , method: 'post', requireToken: true},
                //--------form designer-------
                getForms : { url:  apiServerBaseUrl + '/form-designer/get?elementType=FORM&wd=false', method: 'get', requireToken: true },
                getForm: {url: apiServerBaseUrl + '/form-designer/get', method: 'get', requireToken: true},
                addForm : { url:  apiServerBaseUrl + '/form-designer/create?elementType=FORM', method: 'post', requireToken: true },
                updateForm : { url:  apiServerBaseUrl + '/form-designer/update?elementType=FORM', method: 'put', requireToken: true },
                addTemplate : { url: apiServerBaseUrl + '/form-designer/create?elementType=THEME', method: 'post', requireToken: true },
                attachLogo : { url: apiServerBaseUrl + '/form-designer/attachLogo?', method: 'post', requireToken: true },

                getThemes : {url:  apiServerBaseUrl + '/form-designer/get?elementType=THEME&wd=false', method: 'get', requireToken: true},
                //-------RTA------------------
                getSnapshotRTA: { url: apiServerBaseUrl + '/rta' , method: 'get', requireToken: true},
        //------------ QP Widget ----------
                getQpEvaluatorPendingInteractions: {url: apiServerBaseUrl + '/qpmanager/interactions' , method: 'get', requireToken: true},
                getQpEvaluatorDefaultConfiguration : {url: 'assets/mocks/qpWidgetData.json', method: 'get', requireToken: true}
            };
        }

        //the keys in the list starts with upper case in order to be easier to match server error to this one
        var ERROR_RESPONSE_LIST = {
            LoginFailed: {code: 'LoginFailed'},
            GeneralError: {code: 'GeneralError'},
            InvalidParameters: {code: 'InvalidParameters'},
            UnauthorizedUser : {code : 'UnauthorizedUser'}
        };

        //match api returned error to one of the errors in ERROR_RESPONSE_LIST
        //function getErrorReponseListError(error){
        //    var retError = ERROR_RESPONSE_LIST.GeneralError;
        //
        //    if (error.data && error.data.code && !!ERROR_RESPONSE_LIST[error.data.code]){
        //        retError = ERROR_RESPONSE_LIST[error.data.code];
        //    }
        //
        //    return retError;
        //}

        /*
         Send the request and return promise.
         In case of error, return on of the errors in ERROR_RESPONSE_LIST
         Example of use: APIService.sendRequest2(APIService.ACTION.getExports)
         send with params APIService.sendRequest2(APIService.ACTION.getExports, {id: 3, name: 'aaa'})
         send with params and data: APIService.sendRequest2(APIService.ACTION.login, {a: '1', b: '3'}, {keyword: 'pizza1', count: 11}).
         */
        function sendRequest(action, params, data) {
            var defferd = $q.defer();
            var request = {};
            //send delte with bady for multiple delete
            function sendDelete(params, data, cbResolve, cbReject) {
                $http({
                    method: 'DELETE',
                    url: action.url,
                    data: data,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + User.token
                    }
                }).then(function(res) {
                    cbResolve(res);
                }, function(error) {
                    cbReject(error);
                });
            }

            if (action.method === 'delete' && params === undefined && data !== undefined) {
                request.send = sendDelete;
            }
            else {
                request = $resource(action.url, {}, {send: {cache: action.cache ? true : false, method: action.method,
                    isArray: action.isArray ? action.isArray : false,
                    headers: action.requireToken ? {'Authorization': 'Bearer ' + User.token} : '',
                    withCredentials: true}});
            }

            $log.debug('***GET URL:' + action.url);

            if (!params){
                params = {};
            }

            request.send(params, data, function(res) {
                defferd.resolve(res);
            }, function(error) {
                defferd.reject(error);
            });

            return defferd.promise;
        }

        function clearHTTPCache(action) {
            var cache = $cacheFactory.get('$http');
            cache.remove(action.url);
        }

        return {
            ACTION: ACTION,
            ERROR_RESPONSE_LIST: ERROR_RESPONSE_LIST,
            initialized: initDefer.promise,
            REQUEST_DATE_FORMAT: 'YYYY-MM-DD',
            sendRequest:sendRequest,
            clearHTTPCache: clearHTTPCache
        };
    });
