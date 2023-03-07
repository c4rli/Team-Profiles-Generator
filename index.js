const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// const profileQuestions = [
//     {
//         name: "employeeName",
//         type: "input",
//         message: "Employee Name:"
//     },
//     {
//         name: "employeeID",
//         type: "input",
//         message: "Employee ID:"
//     },
//     {
//         name: "employeeEmail",
//         type: "input",
//         message: "Employee Email Address:"
//     }
// ]

// const specialQuestions = {
//     manager: {
//         name: "managerOffice",
//         type: "input",
//         message: "Office Number"
//     },
//     engineer: {
//         name: "engineerGithub",
//         type: "input",
//         message: "Github Username:"
//     },
//     intern: {
//         name: "internSchool",
//         type: "input",
//         message: "School:"
//     }
// }

const questionProfiles = {
    profileQuestions: [
        {
            name: "employeeName",
            type: "input",
            message: "Employee Name:"
        },
        {
            name: "employeeID",
            type: "input",
            message: "Employee ID:"
        },
        {
            name: "employeeEmail",
            type: "input",
            message: "Employee Email Address:"
        }
    ],
    specialQuestions: {
        manager: [{
            name: "managerOffice",
            type: "input",
            message: "Office Number"
        }],
        engineer: [{
            name: "engineerGithub",
            type: "input",
            message: "Github Username:"
        }],
        intern: [{
            name: "internSchool",
            type: "input",
            message: "School:"
        }]
    },
    getQuestions(type) {
        return this.profileQuestions.concat(this.specialQuestions[type])
    }
}

let teamArray = [];

// function getManagerQuestions() {
//     const questions = questionProfiles.profileQuestions.concat(questionProfiles.specialQuestions.manager)
//     return questions;
// }

// function getInternQuestions() {
//     const questions = questionProfiles.profileQuestions.concat(questionProfiles.specialQuestions.intern)
//     return questions;
// }

// function getEngineerQuestions() {
//     const questions = questionProfiles.profileQuestions.concat(questionProfiles.specialQuestions.engineer)
//     return questions;
// }

// function getQuestions(type) {
//     return questionProfiles.profileQuestions.concat(questionProfiles.specialQuestions[type]);
// }

// console.log(getManagerQuestions());

// const internQuestions = profileQuestions.slice()
// internQuestions.push(specialQuestions.intern);

// const managerQuestions = profileQuestions.slice()
// managerQuestions.push(specialQuestions.manager);

const menuOptions = ["Add Engineer", "Add Intern", "Finish Building Team"];

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// inquirer.prompt(
//     profileQuestions
// ).then(response => {
//     // promptForEngineer();
//     // populate manager info
//     promptForNextEmployee ()
// })

const promptForNextEmployee = () => {
    inquirer.prompt([{
        name: "promptNext",
        type: "list",
        message: "Select:",
        choices: menuOptions
    }]).then(response => {
        displayMenu(response);
    })
}

const displayMenu = (response) => {
    switch (response.promptNext) {
        case menuOptions[0]: promptForEmployee("engineer");
            break;
        case menuOptions[1]: promptForEmployee("intern");
            break;
        case menuOptions[2]: finishBuildingTeam();
            break;
    }
}

const promptForEmployee = (type) => {
    inquirer.prompt(
        questionProfiles.getQuestions(type)
    ).then(response => {
        let employee = "employee";
        if (type === "manager") {
            employee = new Manager(response.employeeName, response.employeeID, response.employeeEmail, response.managerOffice);
        }
        else if (type === "engineer") {
            employee = new Engineer(response.employeeName, response.employeeID, response.employeeEmail, response.engineerGithub);
        }
        else if (type === "intern") {
            employee = new Intern(response.employeeName, response.employeeID, response.employeeEmail, response.internSchool);
        }
        // add new engineer to employees array
        teamArray.push(employee);
        promptForNextEmployee();
    })
}

// const promptForEngineer = () => {
//     inquirer.prompt(
//         //engineer questions

//         questionProfiles.getQuestions("engineer")
//         // internQuestions

//     ).then(response => {
//         const engineer = new Engineer(response.employeeName, response.employeeID, response.employeeEmail, response.engineerGithub)

//         // add new engineer to employees array
//         teamArray.push(engineer);
//         promptForNextEmployee();
//     })
// }

// const promptForIntern = () => {

//     inquirer.prompt(
//         //intern questions
//         questionProfiles.getQuestions("intern")

//     ).then(response => {
//         const intern = new Intern(response.employeeName, response.employeeID, response.employeeEmail, response.internSchool)

//         // add new intern to employees array
//         teamArray.push(intern);
//         promptForNextEmployee();
//     })
// }

// const promptForManager = () => {

//     inquirer.prompt(
//         //manager questions
//         questionProfiles.getQuestions("manager")
//         // getQuestions("manager")
//     ).then(response => {
//         const manager = new Manager(response.employeeName, response.employeeID, response.employeeEmail, response.managerOffice)
//         // add new manager to employees array
//         teamArray.push(manager);
//         promptForNextEmployee();
//     })
// }

const buildPage = () => {
    // render(myArrayOfTeamMembers)
    console.log(render(teamArray))
}

function finishBuildingTeam() {
    console.log(teamArray);
    buildPage()
}
// promptForManager();
promptForEmployee("manager");