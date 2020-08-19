import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import{ SurveyData } from './survey.seeddata';
import { Survey,Data } from 'src/app/shared/survey.model';
import {Ans} from 'src/app/shared/ans.model'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // survey:Survey[]=[];
  constructor() { }

  survey:Survey[]=[
        {
            "topicId": "1001",
            "topicName": "Early Childhood Care & Education (ECCE)",
            "data": [
                {
                    "ref": "1.3",
                    "desc": "A National Curricular and Pedagogical Framework for Early Childhood Care and Education (NCPFECCE)",
                },
                {
                    "ref": "1.4",
                    "desc": "Special attention and priority will be given to districts and locations",
                },
				        {
                    "ref": "1.7",
                    "desc": "New pre-schools will be opened. Anganawadis will be linked with primary education",
                }

            ]
        },
        {
            "topicId": "1002",
            "topicName": "Foundational Literacy and Numeracy (FLN)",
            "data": [
                {
                    "ref": "2.5",
                    "desc": "An interim 3-month play-based ‘school preparation module’ for all Grade 1 students, consisting of activities and workbooks consisting components of foundational literacy and numeracy will be prepared",
                },
                {
                    "ref": "2.6",
                    "desc": "A national repository of high-quality resources on foundational literacy and numeracy will be made available on the Digital Infrastructure for Knowledge Sharing (DIKSHA).",
                },
				        {
                    "ref": "2.7",
                    "desc": "Peer-tutoring will be introduced to promote foundational literacy and numeracy.",
                },
                {
                    "ref": "2.9",
                    "desc": "Children are provided simple but energizing breakfast in addition to midday meals. All school children shall undergo regular health check-ups especially for 100% immunization in schools and health cards will be issued to monitor the same.",
                }

            ]
        }
    ];

  ngOnInit() {
  }


  contForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(5)]),
      mobile: new FormControl('',[Validators.required,,Validators.minLength(10)]),
      email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]),
      org: new FormControl('',[Validators.required]),
      resp: new FormControl('',[Validators.required]),
      choices: new FormArray([]),
      textOther:new FormControl('')
    });

  check(){
    if(this.enable===true ){
      if(this.contForm.controls['textOther'].value.length===0)
        return false;
      }
    return true;
  }
  onSubmit() {
    console.log(this.contForm.value);
    this.contForm.reset();
  }
  enable:boolean=false;
  onCheckChange(event) {
    const formArray: FormArray = this.contForm.get('choices') as FormArray;
    if(event.target.checked){
      console.log(event.target.value);
      if(event.target.value==="Other"){
        this.enable=true;
      }
      formArray.push(new FormControl(event.target.value));
    }
    else{
      let i: number = 0;
      if(event.target.value==="Other"){
        this.enable=false;
      }
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }
}
