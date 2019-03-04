

function deleteLead(leadId) { 
    $.ajax({//making http request to server using js
        url: '/leads/' + leadId + '/delete-json', //route to call in index.js
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({leadId}),//sending and receiving data in json
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res)
            $("#"+leadId).remove();//this to remove selected data from html page
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}

//dollar means calling jquery ajax
//# means $("#"+leadId). handled by jquery
//("#"+leadId) serch for id =lead