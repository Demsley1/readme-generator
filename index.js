const inquirer = require('inquirer');
const markDown = require('./Utils/generateMarkdown')

// TODO: Create an array of questions for user input
const promptUser = () => {
    return inquirer.prompt ([
        {
            name: 'name',
            message: 'What is your name?',
            validate: name => {
                if(name){
                    return true;
                }
                else{
                    console.log("Provide your name")
                    return false;
                }
            },
        },
        {
            name: 'username',
            mesage: 'What is your Github Username?',
            validate: gitHubUser => {
                if(gitHubUser){
                    return true;
                }
                else {
                    console.log('We need your GitHb username (Required)')
                    return false;
                }
            }
        },
        {
            name: 'email',
            message: 'Provide your main work email:',
            validate: email => {
                if(email){
                    return true;
                }
                else{
                    console.log("You will need to provide a email address for users/viewers to communicate with you")
                    return false;
                }
            }
        },
    ]);
};

const projectPrompt = projectData => {
    if(!projectData.projects){
        projectData.projects = [];
    }
    console.log( `
    ===============
    Explain Project
    ===============
    `);
    return inquirer.prompt ([
        {
            name: 'title',
            message: 'What is the title of your project?',
            validate: projectTitle => {
                if(projectTitle){
                    return true;
                }
                else {
                    console.log("Please provide a title for your project!")
                    return false;
                }

            }

        },
        {
            name: 'description',
            message: 'Write a description for the project you created:',
            validate: projectDescription => {
                if( projectDescription) {     
                    return true;
                }
                else {
                    console.log('You need to enter some form of description (Required)')
                    return false;
                }
            }
        },
        {
            name: 'install',
            message: 'Provide a set of clear instructions for users to install app:',
            validate: install => {
                if(install){
                    return true;
                }
                else{
                    return false;
                }
            }
        },
        {
            name: 'usage',
            message: 'Provide a set of clear instructions detailing the correct use of your app and its purpose:',
            validate: usageInfo => {
                if(usageInfo){
                    return true;
                }
                else{
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'contibution',
            message: 'Create a list of rules for contribution:',
            choices:['Code of Conduct', 'Issues', 'Pull request'],
            validate: code => {
                if(code){
                    return true;
                }
                else {
                    console.log("It is recommended that you choose at least one option to provide some sort of guidlines to be used for when users want to contribute")
                    return false;
                }
            }
        },
        {
            name: 'test',
            message: 'Instructions for users to test your code and app.'
        },
        {
            type: 'list',
            name: 'license',
            message: 'Pick a license to be displayed for your project and a description of that license will follow',
            choices: ['ApacheLicense', 'GNUGPLv3', 'MIT', 'ISC'],
            validate: license => {
                if(license){
                    return true;
                }
                else{
                    console.log("the license for your project will tell users how they use and distribute the information found in your repo.")
                    return false;
                }
            }
        }
    ]).then(projectInfo => {
        projectData.projects.push(projectInfo)
        console.log(projectData)
        return projectData;
    });
}

promptUser()
    .then(projectPrompt)
    .then(projectData => {
        markDown(projectData)
    });
