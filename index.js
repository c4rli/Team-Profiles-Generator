const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const profileQuestions = [
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
]

const specialQuestions = {
    manager: {
        name: "managerOffice",
        type: "input",
        message: "Office Number"
    },
    engineer: {
        name: "engineerGithub",
        type: "input",
        message: "Github Username:"
    },
    intern: {
        name: "internSchool",
        type: "input",
        message: "School:"
    }
}


const engineerQuestions = profileQuestions.slice()
engineerQuestions.push(specialQuestions.engineer);

const internQuestions = profileQuestions.slice()
internQuestions.push(specialQuestions.intern);

const managerQuestions = profileQuestions.slice()
managerQuestions.push(specialQuestions.manager);



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


function displayMenu(response) {
    switch (response.promptNext) {
        case menuOptions[0]: promptForEngineer();
            break;
        case menuOptions[1]: promptForIntern();
            break;
        case menuOptions[2]: finishBuildingTeam();
            break;

    }
}

const promptForEngineer = () => {
    inquirer.prompt(
        //engineer questions

        engineerQuestions
        // internQuestions

    ).then(response => {
        // add new engineer to employees array
        promptForNextEmployee();
    })
}



const promptForIntern = () => {

    inquirer.prompt(
        //intern questions
        internQuestions

    ).then(response => {
        // add new intern to employees array
        promptForNextEmployee();
    })
}

const promptForManager = () => {

    inquirer.prompt(
        //manager questions
        managerQuestions

    ).then(response => {
        // add new manager to employees array
        promptForNextEmployee();
    })
}

const buildPage = () => {
    // render(myArrayOfTeamMembers)
}

function finishBuildingTeam() {

}

promptForManager();