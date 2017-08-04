// ==UserScript==
// @name Add Clear Button to Zhihu
// @namespace LHA
// @description Add a button to clean the answer page of Zhihu. Created By LHA.
// @include http://www.zhihu.com/question/*
// @include https://www.zhihu.com/question/*
// @match http://www.zhihu.com/question/*
// @match https://www.zhihu.com/question/*
// @version 1.4
// ==/UserScript==

window.addEventListener('load', function() {

    var document = window.document;

    var removeNodeBySelector = function (selector) {
        var nodes = document.querySelectorAll(selector),
            nodesLength = nodes.length,
            i,
            node;
        for (i = 0; i < nodesLength; i += 1) {
            node = nodes[i];
            node.parentNode.removeChild(node);
        }
    };
    
    var prepareForPrint = function () {

        removeNodeBySelector("header.Sticky");
        removeNodeBySelector("div.Sticky--holder");
        removeNodeBySelector("div.CollapsedAnswers-bar");
        removeNodeBySelector("div.QuestionMainAction");
        
        removeNodeBySelector("div.Question-sideColumn");
        removeNodeBySelector("div.QuestionHeader");
        removeNodeBySelector("div.QuestionAnswers-answerAdd");       
        removeNodeBySelector("div.MoreAnswers");     
        
        
        var nodes = document.querySelectorAll("a.QuestionMainAction");

        for (var i = 0; i < nodes.length; i += 1) {
            var node = nodes[i];
            if (node)
                {
                    //node.parentNode.removeChild(node);   
                    p = node.parentNode;
                    p.parentNode.removeChild(p);   
                }
        }
        
       node = document.querySelectorAll("button.QuestionMainAction")[0];

        if (node)
        {
            p = node.parentNode;
            p.parentNode.removeChild(p);   
        }
             
        var buttons = document.querySelectorAll("a.LHA-Add");

        for (var i = 0; i < buttons.length; i += 1) {
            var b = buttons[i];
            if (b)
                {
                    b.parentNode.removeChild(b);   
                }
        }        
 
        var bgDiv = document.querySelectorAll("body.Entry-body")[0];
        
        if (bgDiv) { bgDiv.style = 'background-color:#666666';}

    };
    
    
    var clearInfo = function(className) {
        
        var newElement;
        var div_list = document.querySelectorAll("div." + className);
        nodesLength = div_list.length;               
        
        console.log("find " + className + " div:" + nodesLength);         
        
        for (i = 0; i < nodesLength; i += 1) {
            node = div_list[i];
            if (node) {
                
               if (node.getAttribute("Added") == "1") continue ;
                
               var answerID = 0;
               var tmpNodes = node.querySelectorAll("div.ContentItem");
                
               if (tmpNodes && (tmpNodes.length >= 0) && (tmpNodes[0])) {                                    
                  var answerID = tmpNodes[0].getAttribute("name");                   
               } else continue;                   
               
               var qURL = document.querySelectorAll("meta")[0].baseURI;
                
               var index = qURL.indexOf('answer');

               if (index > 0 )  qURL = qURL.substr(0, index - 1);       

               var singAnswerLink = document.createElement("a");
               singAnswerLink.innerHTML = "ID:" + answerID;
               singAnswerLink.className = "Button LHA-Add";
               singAnswerLink.style = "line-height:15px;margin-bottom:10px";
               singAnswerLink.href = qURL + "/answer/" + answerID;               
               
                
               var clearBtn = document.createElement("a");
               clearBtn.innerHTML = "Clear Info"; 
               clearBtn.className = "Button LHA-Add";
               clearBtn.style = "line-height:15px;margin-bottom:10px";
               clearBtn.href = "javascript:;";
               clearBtn.addEventListener("click", prepareForPrint);
                
               node.insertBefore(singAnswerLink, node.firstChild); 
               node.insertBefore(clearBtn, node.firstChild); 
               
               node.setAttribute("Added","1"); 
            }
           } 
                
    }
    
    window.addCleanButton = function () {                
        
        var nodes = document.querySelectorAll("div"),
            nodesLength = nodes.length,
            i,
            node;
        for (i = 0; i < nodesLength; i += 1) {
            node = nodes[i];
            //if (node.className == 'List-Item')
            //#node.parentNode.removeChild(node);
           }       
        
        clearInfo('QuestionAnswer-content');
        clearInfo('List-item');        
        
    };
    
	addCleanButton();		    
    
    var tt = setInterval(function(){
       window.addCleanButton();
    }, 3000);
    
}, false);



