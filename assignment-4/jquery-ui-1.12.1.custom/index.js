

//Creating the entire JSON

let resume = {
    "objective": "",
    "education": {
        "university": "",
        "startdate":"",
        "enddate": "",
        "degree": "",
        "major": ""
    },
    "technical_skills": {
        "programming_languages": [],
        "cloud_services": []
    }
}


// $("#objective").draggable({
//     containment: "body",
//     axis: "y"
// });

// $("#education").draggable({
//     containment: "body",
//     axis: "y"
// });

// $("#technical-skills-main-div").draggable({
//     containment: "body",
//     axis: "y"
// });

let tempArrayProgrammingLanguages = [];

$(function(){
    $("#div-programming-languages").droppable({
        accept:"#java, #js, #python",
        drop: function(event, ui) {
            if(!tempArrayProgrammingLanguages.includes(ui.helper.context.innerHTML)) {
                $(this)
                .find( "#label-programming-languages-values" )
                .append("<p id=temp"+ ui.helper.context.id +">"+ ui.helper.context.innerHTML +"&nbsp &nbsp</p>");
                tempArrayProgrammingLanguages.push(ui.helper.context.innerHTML);
            }
        }
    })
    
});

let tempArrayCloudServices = [];

$(function(){
    $("#div-cloud-services").droppable({
        accept:"#aws, #gcp, #azure",
        drop: function(event, ui) {
            if(!tempArrayCloudServices.includes(ui.helper.context.innerHTML)) {
                $(this)
                .find( "#label-cloud-services-values" )
                .append("<p id=temp"+ ui.helper.context.id +">"+ ui.helper.context.innerHTML +"&nbsp &nbsp</p>");
                tempArrayCloudServices.push(ui.helper.context.innerHTML);
            }
        }
    })
    
});


$( "#btnAddEducation" ).button().on( "click", function() {
    $( "#appendedEducation").remove();
    $( "#dialog-form" ).dialog( "open" );
});


dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 700,
    width: 600,
    marginTop: 20,
    modal: true,
    buttons: {
        "Create an account": addEducation,
        "Close": function() {
            dialog.dialog( "close" );
    }},
    close: function() {
      form[ 0 ].reset();
    }
});

form = dialog.find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    addEducation();
});


function addEducation() {
    let uname = $( "#uname" ).val();
    let degree = $("#degree").val();
    let startdate = $("#start-date").val();
    let enddate = $("#end-date").val();
    let major = $("#major").val();

    

    if(uname !== "") {
        resume.education.university = uname;
        resume.education.degree = degree;
        resume.education.startdate = startdate;
        resume.education.enddate = enddate;
        resume.education.major = major;
        $('#education').append(
            "<div id='appendedEducation'>" +
                "<h4>" + degree + " "+ major + "</h4>" + "<em>" + uname + "</em>" +
            "</div>"
            
        );
    
    }
    
    dialog.dialog('close');
    
}

$( "#dialog-form" ).on('dialogopen', function(event, ui) {
    $( "#degree" ).selectmenu();
    form[ 0 ].reset();
});


$( "#btnAddObjective" ).button().on( "click", function() {
    $( "#appendedObjective").remove();
    $( "#dialog-form-objective" ).dialog( "open" );
});

dialog_objective = $( "#dialog-form-objective" ).dialog({
    autoOpen: false,
    height: 300,
    width: 600,
    marginTop: 20,
    modal: true,
    buttons: {
        "Create Objective": addObjective,
        "Close": function() {
            dialog_objective.dialog( "close" );
    }},
    close: function() {
      form[ 0 ].reset();
    }
});

form_objective = dialog_objective.find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    addObjective();
});

$( "#dialog-form-objective" ).on('dialogopen', function(event, ui) {
    form_objective[ 0 ].reset();
});

function addObjective() {
    let obj = $("#input-objective").val();
    if(obj !== null) {
        resume.objective = obj;
        $('#objective').append(
            "<div id='appendedObjective'>" +
                "<p>" + obj + "</p>" +
            "</div>"
        );
    }

    dialog_objective.dialog('close');
}

$( "#start-date" ).datepicker({
    changeMonth: true,
    changeYear: true
});

$( "#end-date" ).datepicker({
    changeMonth: true,
    changeYear: true
});


$( "#technical-skills-accordian" ).accordion({
    collapsible: true
  });

  $('#java').draggable({
    containment: "#technical-skills-main-div",
    helper: 'clone'
  });

  $('#js').draggable({
    containment: "#technical-skills-main-div",
    helper: 'clone'
  });

  $('#python').draggable({
    containment: "#technical-skills-main-div",
    helper: 'clone'
  });

  $('#aws').draggable({
    containment: "#technical-skills-main-div",
    helper: 'clone'
  });

  $('#gcp').draggable({
    containment: "#technical-skills-main-div",
    helper: 'clone'
  });

  $('#azure').draggable({
    containment: "#technical-skills-main-div",
    helper: 'clone'
  });



  $("#submit").button().on('click', function() {
    resume.technical_skills.programming_languages = tempArrayProgrammingLanguages;
    resume.technical_skills.cloud_services = tempArrayCloudServices;

    console.log("Resume Object:",resume);
  });

