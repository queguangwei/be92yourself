import { App, Home } from '../views';
export const routes = {
    path: '/',
    getComponent(nextState,cb){
        require.ensure([],require=>{
            cb(null,require('../views/App'));
        },'nav')
    },
    indexRoute: {
        getComponent(nextState,cb){
            require.ensure([],require=>{
                cb(null,require('../views/Home'));
            },'home')
        }
    },
    childRoutes: [
        {
            path: 'notice',
            getComponent(nextState,cb){
                require.ensure([],require=>{
                    cb(null,require('../views/Notice'));
                },'notice')
            },

        },
        {
            path: 'artifact',
            getComponent(nextState,cb){
                require.ensure([],require=>{
                    cb(null,require('../views/Artifact'));
                },'notice')
            },

        },
        {
            path: 'pmhome',
            getComponent(nextState,cb){
                require.ensure([],require=>{
                    cb(null,require('../views/personnelManagement/pmHome'));
                },'pm')
            },

        },
        {
            path: 'gradhome',
            getComponent(nextState,cb){
                require.ensure([],require=>{
                    cb(null,require('../views/grading/gradHome'));
                },'grading')
            }
        },
        {
            path: 'kpihome',
            getComponent(nextState,cb){
                require.ensure([],require=>{
                    cb(null,require('../views/kra/kpiHome'));
                },'kpi')
            },

        },
        {
            path: 'kpiplan',
            getComponent(nextState,cb){
                require.ensure([],require=>{
                    cb(null,require('../views/kra/kpiPlan'));
                },'kpi')
            },

        },
        {
            path: 'kpidetail',
            getComponent(nextState,cb){
                require.ensure([],require=>{
                    cb(null,require('../views/kra/kpiDetail'));
                },'kpi')
            },

        },
        {
            path: 'kpigrade',
            getComponent(nextState,cb){
                require.ensure([],require=>{
                    cb(null,require('../views/kra/kpiGrade'));
                },'kpi')
            },

        }
    ]
};