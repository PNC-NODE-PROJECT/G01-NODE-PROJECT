
const question_title = document.querySelector("#question");
const answerA = document.querySelector("#answerA");
const answerB = document.querySelector("#answerB");
const answerC = document.querySelector("#answerC");
const answerD = document.querySelector("#answerD");
const correct_Answer_All = document.querySelectorAll(".radio_answer");
let domDisplay = document.getElementById("listQuestion");
let domContain = document.getElementsByClassName("container_quiz");
const points = document.querySelector('#points');
let click = false;
let onclicks = "";
const createQuestion =() =>{
    let questions = 
        {   
            title: question_title.value,
            answer:{
                answer1: answerA.value,
                answer2: answerB.value,
                answer3: answerC.value,
                answer4: answerD.value,
            },
            score: points.value       
           
        }

    for (let correct of correct_Answer_All){
        if (correct.checked){  
            questions["correct_ans"] = correct.id;
            onclicks = correct.checked;
            click = true;
            let id=correct.id;
            console.log( id )
        }
    }
    // click = true;
    console.log(questions)
    return questions;
};

const btn_add = document.querySelector("#btn-add");
btn_add.addEventListener('click', createQuestion);


function show_menus() {
    document.querySelector(".container").style.display = "none";
    document.querySelector(".create-quiz").style.display = "none";
    document.querySelector(".group-start").style.display = "flex";
    document.querySelector(".Total_score").style.display = "none";
    document.querySelector(".container_quiz").style.display = "none";



}
function show_hide() {
    document.querySelector(".create-quiz").style.display = "block";
    document.querySelector(".container").style.display = "none";
    document.querySelector(".group-start").style.display = "none";
    document.querySelector(".Total_score").style.display = "none";
    document.querySelector(".container_quiz").style.display = "none";
    console.log('helo');

}

function display_all(alldata){
    while(domDisplay.firstChild){
        domDisplay.removeChild(domDisplay.lastChild);
    };
    for (let display of alldata){
        let add_questions_container = document.createElement('div');
        add_questions_container.className = "question_list";
        add_questions_container.id = display._id;
        domDisplay.appendChild(add_questions_container);
        let div_questions = document.createElement('div');
        div_questions.className = "questions";
        div_questions.textContent= display.title;
        add_questions_container.appendChild(div_questions);
    
        let form_group = document.createElement('div');
        form_group.className="form_group";
        div_questions.appendChild(form_group)
    
        let answers = document.createElement('div');
        answers.className = "answers";
        add_questions_container.appendChild(answers)
        let index = ["1","2","3","4"];
        let ans = [display.answer.answer1,display.answer.answer2,display.answer.answer3,display.answer.answer4,display.correct_ans]
        for (let k = 1; k < index.length+1; k++) {
            // ans.issable = false
            let answer = document.createElement('div');
            answer.className = "answer";
            answer.textContent=ans[k-1];
        
            if(k == ans[4]){
                answer.style.backgroundColor = "Green";
            }
            else {
                answer.style.backgroundColor = "gray";
            }
            answers.appendChild(answer)
           
            question_title.value=""
            answerA.value=""
            answerB.value=""
            answerC.value=""
            answerD.value=""
            points.value=""
            for (let correct of correct_Answer_All){
                if (correct.checked){  
                    correct.checked = false;
                }
            }

        }
        
        let moreButton = document.createElement('div');
        moreButton.className = 'moreButton';
        moreButton.id = display._id
        const btn_edit=document.createElement('button');
        btn_edit.className = 'edit';
        btn_edit.textContent = 'Edit';
        moreButton.appendChild(btn_edit)
        
        btn_edit.className='edit';
        btn_edit.textContent = 'Edit';
        moreButton.appendChild(btn_edit)
        const btn_delete=document.createElement('button');
        btn_delete.className='delete';
        btn_delete.textContent = 'delete';
        moreButton.appendChild(btn_delete);
        btn_delete.addEventListener('click',delete_question);
        answers.appendChild(moreButton)
        console.log("My dom", add_questions_container);
    }
}
// delete question

function delete_question(event){
    let id=event.target.parentElement.parentElement.parentElement.id
    if (event.target.className == "delete") {
        // let parent=remove_question.parentNode.id;
        // parent.removeChild(remove_question);
        axios.delete("http://localhost:3000/deletequestion/"+id) .then((result)=>{
            // getDataFromServer();
            getdata();
        })
      } 
}


// check to update or add questions

function btnupdateQuesiont(btn){
    // console.log("My btn", btn);
    if(btn.textContent=="Add Question"){
        addQuestion();
    }
    if(btn.textContent == "Update"){
        // call function request server to update
        updatenewdata();
        getdata();
        document.querySelector(".question_list").style.display = "block";
        btn.textContent="Add Question";
        question_title.value=""
        answerA.value=""
        answerB.value=""
        answerC.value=""
        answerD.value=""

    }
  
}

let questionId = ""
document.body.addEventListener("click", (e)=>{
    
    if(e.target.className =="edit"){
        updatedata(e.target.parentNode.id);
        questionId = e.target.parentNode.id;
        // console.log("My id question is", e.target.parentNode.id);
        document.querySelector(".question_list").style.display = "none";
        // document.querySelector("#listQuestion").style.display = "block";
        
    }else if(e.target.id=="btn-add"){
        if (question_title.value =='' || answerA.value == '' || answerB.value == '' || answerC.value == '' || answerD.value == '' || points.value == 0 ) {
            window.alert('Please input all data before you create the question')
        }
        if( click == false){
            alert("Please choose the correct_answer!")
        }
        else {
            btnupdateQuesiont(e.target);
        }
    }
    if ( e.target.id == "btn-play"){
        display_all_questions();
        document.querySelector(".group-start").style.display = "none";
        document.querySelector(".container").style.display = "none";
        document.querySelector(".container_quiz").style.display = "block";
    }
    if(e.target.className == "btn_submit"){
        calculateScore();
        
    }
})

// update question
function updatedata(questionId){
    axios.get("http://localhost:3000/datas").then((result) =>{
       let  alldata = result.data
        alldata.forEach(element => {
            if(element._id==questionId){
                // console.log("question to edit ", element);
                document.querySelector("#question").value=element.title
                
                document.querySelector("#answerA").value=element.answer.answer1
                document.querySelector("#answerB").value=element.answer.answer2
                document.querySelector("#answerC").value=element.answer.answer3
                document.querySelector("#answerD").value=element.answer.answer4

                let isCorrect=document.querySelectorAll(".radio_answer")
                for(let i=1; i<=isCorrect.length; i++){
                    if(parseInt(element.correct_ans)==i){
                        isCorrect[i].checked = true
                    }
                }          
            }
        });
        btn_add.textContent="Update"
    })
}


let old_correct_Answer = " ";
let new_correct_id = " ";
// play question or quiz
function display_all_questions() {
    axios.get("http://localhost:3000/datas").then((result)=>{
        let alldata = result.data;
    while(domContain.firstChild){
        domContain.removeChild(domContain.lastChild);
    };
    let countAnswer = 0;
    let  div_display = document.querySelector(".container_quiz");
    
    let contain_questions = document.createElement('div');
    contain_questions.className = "contain_question";
    for(let indexdata of alldata) {  
        old_correct_Answer = indexdata.correct_ans;
        
        
        let show_question = document.createElement('div');
        show_question.className ="show_question";
        contain_questions.appendChild(show_question);
        
        let dis_question = document.createElement('div');
        dis_question.className = "dis_question";
        dis_question.textContent = indexdata.title;
        show_question.appendChild(dis_question);
        
        
        let h3 = document.createElement("h3");
        h3.textContent = "Answer";
        contain_questions.appendChild(h3);
        
        let line1 = document.createElement('div');
        line1.className = "line1";
        contain_questions.appendChild(line1);
        
        let answer_controll = document.createElement("div");
        answer_controll.className = "answers_controll";
        contain_questions.appendChild(answer_controll);
        
        let ar = ["1","2","3","4"];
        let ans = [indexdata.answer.answer1,indexdata.answer.answer2,indexdata.answer.answer3,indexdata.answer.answer4,indexdata.correct_ans]
        countAnswer ++
        for ( let i=0; i<ar.length;i++) {
            new_correct_id = ar[i];
            let answer = document.createElement("div");
            answer.className = "answer" +ar[i];
            let radio_answers = document.createElement('input');
            radio_answers.className = "all_answers";
            radio_answers.id = ar[i];
            radio_answers.setAttribute("type", "radio");
            radio_answers.setAttribute("name", "answer" +countAnswer );
            radio_answers.setAttribute("value", ar[i] );
            
            let answerlist = document.createElement('label');
            answerlist.setAttribute("for",ar[i])
            answerlist.textContent = ans[i];
            
            
            
            // contain_questions.appendChild(h3);
            answer_controll.appendChild(answer);
            answer.appendChild(radio_answers);
            answer.appendChild(answerlist);
            // contain_questions.appendChild(show_question);
            // div_display.appendChild(contain_questions);
        }
        
        let line = document.createElement('span');
        line.className=" line";
        contain_questions.appendChild(line);

    }
    let submit = document.createElement('button');
    submit.className = "btn_submit";
    submit.textContent = " submit";
    div_display.appendChild(contain_questions);
    div_display.appendChild(submit);
    // submit.addEventListener('click', calculateScore)
    // document.body.appendChild(div_display);
});
}

// count score
is_check=false;
let correct_answer = [];
function calculateScore(){
    let controlAnswers = document.querySelectorAll(".answers_controll");
    let array_questions = []
    axios.get("http://localhost:3000/datas").then((result)=>{
        array_questions = result.data;
        let user_answer = []
        let Total_Score = 0;
        let full_scor = 0;
        for (let controlAnswer of controlAnswers){
            let answers = controlAnswer.childNodes;
            for(let answer of answers){
               let check_Correct_Answer = answer.firstChild;
               let new_correct_id = check_Correct_Answer.id;
               let new_correct_Answer = check_Correct_Answer.checked;
               if (new_correct_Answer){
                   is_check=false;
                   let new_correct_Answer_id = new_correct_id;
                    user_answer.push(new_correct_Answer_id);
               }
            }
            is_check=true;
        }
        for (let k =0;k<user_answer.length;k++){
            if (user_answer[k] == array_questions[k].correct_ans){
                Total_Score += array_questions[k].score; 
            }

            full_scor += array_questions[k].score;
            // console.log(full_score)
        }
        document.querySelector(".container_quiz").style.display = "none";
        document.querySelector(".Total_score").style.display = "block";
        let display_score = document.querySelector(".Total_score");
        let text_score = document.createElement('h1');
        text_score.className = "Total ";
        text_score.textContent = "Total Score";
        let contain_score = document.createElement('div');
        contain_score.className = "contain_score";
        let show_score = document.createElement('h2');
        show_score.className = "show_score";
        show_score.textContent =  Total_Score  ;
        contain_score.appendChild(show_score);
        
        let full_score = document.createElement('h2');
        full_score.className = "show_score";
        full_score.textContent = "  / "+full_scor;
        contain_score.appendChild(full_score);
        
        display_score.appendChild(text_score);
        display_score.appendChild(contain_score);
    })

}


// add data form client to the server 
function addQuestion(){
    let url = 'http://localhost:3000/data'
    data = createQuestion()
    axios.post(url, data).then((result) => {
        let listdata = result.data
        console.log(listdata);
        getdata();

    })
}

// display all data from mongoDB
function getdata(){
    axios.get("http://localhost:3000/datas").then((result) =>{
        let alldata = result.data;
        // console.log(alldata);
        display_all(alldata);
        // add_questions(alldata);
    })
}

// update date in the mongoDB

function updatenewdata(){
    newdata = createQuestion();
    let url = "http://localhost:3000/updateDt/"+ questionId
    axios.put(url,newdata).then((result) =>{
    });
}




// ===============main button==========

let btn_start = document.querySelector(".btn-start").addEventListener("click", show_menus);

let btn_create = document.querySelector(".btn-create").addEventListener("click",()=>{
    show_hide();
    getdata();

});
let btn_back = document.querySelector("#btn_back").addEventListener("click",()=>{
    document.querySelector(".group-start").style.display = "flex";
    document.querySelector(".create-quiz").style.display = "none";
    document.querySelector(".container_quiz").style.display = "none";
  
});



// ==============hidden button==================

document.querySelector(".group-start").style.display = "none";
document.querySelector(".create-quiz").style.display = "none";
document.querySelector(".Total_score").style.display = "none";
document.querySelector(".container_quiz").style.display ="none";





