/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
google.load('visualization', '1.1', {
    'packages': ['corechart']
});
google.setOnLoadCallback();

function getVendorResourceList(){
    $("#vendorResourceChart").css('visibility', 'visible');
    document.getElementById('chartTitle').innerHTML = "<font color=green>Vendor Resources Requirements Yearly Analysis</font>";

    var dashYears=$('#year').val();
    var dashMonths=$('#month').val();
    //alert("HI "+csrCustomers+"  "+dashYears)
    
    var url='../turnip/vendorResourceDetails.action?dashYears='+dashYears+'&dashMonths='+dashMonths;
    var req=initRequest(url);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            //            alert(req.responseText)
            populateVendorResourceDashboardTable(req.responseText);
        } 
    };
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    return false;
}

function populateVendorResourceDashboardTable(response){
    //alert(response.length)
    //    $(".page_option").css('display', 'block');
    var dashBoardReq=response.split("^");
    //    var table = document.getElementById("vendorResourceDashboardResults");
    var month = new Array();
    
    var vend1 =new Array();
    var vendCount1 =new Array();
    var vend2 =new Array();
    var vendCount2 =new Array();
    var vend3=new Array();
    var vendCount3 =new Array();
    var vend4=new Array();
    var vendCount4 =new Array();
    var vend0=new Array();
    var vendCount0 =new Array();
    var others=new Array();
    var othersCount=new Array();
    //    for(var i = table.rows.length - 1; i > 0; i--)
    //    {
    //        table.deleteRow(i);
    //    }
    if(response.length!=0){
        for(var i=0;i<dashBoardReq.length-1;){
            var otherCount=0;
            var j=0;
            var data =[];
            var vend =[vend0,vend1,vend2,vend3,vend4];
            var vendCount=[vendCount0,vendCount1,vendCount2,vendCount3,vendCount4];
            data[0]=dashBoardReq[i].split("|");
            {  
                //                var row = $("<tr />")
                //                $("#vendorResourceDashboardResults").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
                //                row.append($("<td>" + data[0][0] + "</td>"));
                //                row.append($("<td>" + data[0][1] + "</td>"));
                //                row.append($("<td>" + data[0][2] + "</td>"));
                //                row.append($("<td>" + data[0][3] + "</td>"));
                if(j==0){
                    month.push(data[j][0]);
                //                    vend[j].push((data[j][1],)); 
                }
                do{
                    if(j<5){
                        vend[j].push((data[j][0]+","+data[j][1]+","+data[j][2]));
                        vendCount[j].push(parseInt(data[j][2]));
                    }
                    else{
                        otherCount= otherCount+parseInt(data[j][2]);
                    }
                    j++;
                    data[j]= dashBoardReq[i+j].split("|");
                }while(data[0][3]==data[j][3]);
                if(j==1){
                    vend1.push('');
                    vend2.push('');
                    vend3.push('');
                    vend4.push('');
                    vendCount1.push(parseInt(0));
                    vendCount2.push(parseInt(0));
                    vendCount3.push(parseInt(0));
                    vendCount4.push(parseInt(0));
                    othersCount.push(parseInt(0));
                    others.push('');
                }
                else if(j==2){
                    vend2.push('');
                    vend3.push('');
                    vend4.push('');
                    others.push('');
                    vendCount2.push(parseInt(0));
                    vendCount3.push(parseInt(0));
                    vendCount4.push(parseInt(0));
                    othersCount.push(parseInt(0));
                }
                else if(j==3){
                    vend3.push('');
                    vend4.push('');
                    vendCount3.push(parseInt(0));
                    vendCount4.push(parseInt(0));
                    othersCount.push(parseInt(0));
                    others.push('');
                }
                else if(j==4){
                    vend4.push('');
                    vendCount4.push(parseInt(0));
                    othersCount.push(parseInt(0));
                    others.push('');
                }
                else if(otherCount>0){
                    othersCount.push(parseInt(otherCount));
                    //                    others.push(data[j-1][0]+",Others,"+data[j-1][2]);
                    others.push(data[j-1][0]+",Others,"+otherCount);
                }
                i=i+j;
            }   
        }
        showVendorResourceChart(month,vend[0],vendCount[0],vend[1],vendCount[1],vend[2],vendCount[2],vend[3],vendCount[3],vend[4],vendCount[4],othersCount,others);
    }
    else{
        $("#vendorResourceChart").css('visibility', 'hidden');
    //        var row = $("<tr />")
    //        $("#vendorResourceDashboardResults").append(row);
    //        row.append($('<td colspan="7"><font style="color: red;font-size: 15px;">No Records to display</font></td>'));
    //        $(".page_option").css('display', 'none');
    }
//    $('#vendorResourceDashboardResults').tablePaginate({
//        navigateType:'navigator'
//    },recordPage);
//    pager.init(); 
}


function showVendorResourceChart(month,vend1,vendCount1,vend2,vendCount2,vend3,vendCount3,vend4,vendCount4,vend5,vendCount5,othersCount,others)
{
    var Combined = new Array();
    Combined[0] = ['Month', vend1,{
        type : 'string',
        role: 'tooltip'
    },
    vend2,{
        type : 'string',
        role: 'tooltip'
    },
    vend3,{
        type : 'string', 
        role: 'tooltip'
    },
    vend4,{
        type : 'string',
        role: 'tooltip'
    },
    vend5,{
        type : 'string',
        role: 'tooltip'
    },
    others,{
        type:'string',
        role:'tooltip'
    }];
    for (var i = 0; i < 10; i++){
        Combined[i + 1] = [ month[i], vendCount1[i],vend1[i],vendCount2[i],vend2[i],vendCount3[i],vend3[i],
        vendCount4[i],vend4[i],vendCount5[i],vend5[i],othersCount[i],others[i]];
    }
    //second parameter is false because first row is headers, not data.
    var data = google.visualization.arrayToDataTable(Combined, false);
    var options = {
        colors: ['#0000FF', '#00FF00', '#FF0000','#00BFFF'],
        legend: 'none',
        isStacked : true
    }
    var chart = new google.visualization.ColumnChart(document.getElementById('vendorResourceChart'));
    // Instantiate and draw our chart, passing in some options.
    //    function selectHandler() {
    //        var selectedItem = chart.getSelection()[0];
    //        if (selectedItem) {
    //            var value = data.getValue(selectedItem.row, selectedItem.column);
    //            alert('The user selected ' + value);
    //        }
    //    }
    //
    //    
    //    google.visualization.events.addListener(chart, 'select', selectHandler);
    //     {
    //        alert("in select")
    //        var selection = chart.getSelection();
    //        if (selection.length) {
    //            alert(data.getValue(selection[0].row, 0) + ' ' + data.getValue(selection[0].row, selection[0].column));
    //        }
    //    });
    chart.draw(data, options);
    $(window).resize(function () {
        chart.draw(data, options);
    });
}
function validationVendorResourceDashboardYear(evt)
{
    var  minRate=document.getElementById("year").value;
    var rate=(minRate.toString()).length;
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if ( iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57) )
    {
        if(rate != 4)
        {
            $("#VendorResourceDashValidation").html(" <font color='red'>enter only numbers</font>");  
            $("#VendorResourceDashValidation").show().delay(4000).fadeOut();
        }
        if(iKeyCode == 8)
        {
            return true;       
        }
        else
        {
            return false;
        }
    }
    else if( rate >= 4)
    {
        if(iKeyCode == 8)    
        {
            return true; 
        }
        else
        {
            return false;       
        }
    }
    else 
    {
        $("#customerDashValidation").html("");
        return true;
    }
}

function getNoofProjectResourcesRequired(){
    $("#projectResource").css('visibility', 'visible');
    document.getElementById('ProjectTitle').innerHTML = "<font color=green>Project Resources Requirements Yearly Analysis</font>";
    var dashYears=$('#year').val();
    var dashMonths=$('#month').val();
    var url='../turnip/projectResourceDetails.action';//?dashYears='+dashYears+'&dashMonths='+dashMonths;
    var req=initRequest(url);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            populateProjectResourceDashboardTable(req.responseText);
        } 
    };
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    return false;
}

function populateProjectResourceDashboardTable(response){
    //    $(".page_option").css('display', 'block');
    var venCount;
    var dashBoardReq=response.split("^");
    var month = new Array();
    var open=new Array();
    var release =new Array();
    var openForResume =new Array();
    var close=new Array();
    var others=new Array();
    if(response.length!=0){
        var total=0;
        for(var i=0;i<dashBoardReq.length-1;i++){   
            var Values=dashBoardReq[i].split("|");
            {  
                month.push(Values[0]);
                open.push((Values[1]));
                release.push(parseInt(Values[2]));
                //                venCount=Values[3].split(",");
                ////                if(Values[3].length!=0){
                //                    for(var j=0;j<Values[3].length-1;j++){
                //                        if(venCount[0]==venCount[j]){
                //                            
                //                        }
                //                    }
                //                }
                openForResume.push(parseInt(Values[3]));
            }
        }
        showProjectResourceChart(month,open,release,openForResume);
    }
    else{
        $("#projectResource").css('visibility', 'hidden');
    }
}

function showProjectResourceChart(month,open,release,openForResume)
{
    var Combined = new Array();
    Combined[0] = [open[0], open[1]];//,open[4],open[0]];
    for (var i = 0; i < 10; i++){
        Combined[i + 1] = [ month[i], release[i]];
    }
    //second parameter is false because first row is headers, not data.
    var data = google.visualization.arrayToDataTable(Combined, false);
    var options = {
        colors: ['#0000FF', '#00FF00', '#FF0000','#00BFFF'],
        legend: 'none'
    }
    var chart = new google.visualization.ColumnChart(document.getElementById('projectResource'));
    // Instantiate and draw our chart, passing in some options.
    chart.draw(data, options);
    $(window).resize(function () {
        chart.draw(data, options);
    });
}
function getClientResourceList(){
    $("#clientResourceChart").css('visibility', 'visible');
    document.getElementById('chartTitle').innerHTML = "<font color=green>Client Resources Requirements Yearly Analysis</font>";

    var dashYears=$('#year').val();
    var dashMonths=$('#month').val();
    //alert("HI "+csrCustomers+"  "+dashYears)
    
    var url='../turnip/clientResourceDetails.action';//?dashYears='+dashYears+'&dashMonths='+dashMonths;
    var req=initRequest(url);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            //alert(req.responseText)
            populateClientResourceDashboardTable(req.responseText);
        } 
    };
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    return false;
}
function populateClientResourceDashboardTable(response){
    $(".page_option").css('display', 'block');
    var dashBoardReq=response.split("^");
    var table = document.getElementById("clientResourceDashboardResults");
    var month = new Array();
    alert(response)
    var vend1 =new Array();
    var vendCount1 =new Array();
    var vend2 =new Array();
    var vendCount2 =new Array();
    var vend3=new Array();
    var vendCount3 =new Array();
    var vend4=new Array();
    var vendCount4 =new Array();
    var vend0=new Array();
    var vendCount0 =new Array();
    var othersCount=new Array();
    var others=new Array();
    for(var i = table.rows.length - 1; i > 0; i--)
    {
        table.deleteRow(i);
    }
    if(response.length!=0){
        for(var i=0;i<dashBoardReq.length-1;){   
            var otherCount=0;
            var j=0;
            var data =[];
            var vend =[vend0,vend1,vend2,vend3,vend4];
            var vendCount=[vendCount0,vendCount1,vendCount2,vendCount3,vendCount4];
            data[0]=dashBoardReq[i].split("|");
            {  
                //alert(Values[0])
                //                var row = $("<tr />")
                //                $("#clientResourceDashboardResults").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
                //                row.append($("<td>" + Values[0] + "</td>"));
                //                row.append($("<td>" + Values[1] + "</td>"));
                //                row.append($("<td>" + Values[2] + "</td>"));

                if(j==0){
                    month.push(data[j][0]);
                //                    vend[j].push((data[j][1],)); 
                }
                do{
                    if(j<5){
                        vend[j].push((data[j][0]+","+data[j][1]+","+data[j][2]));
                        vendCount[j].push(parseInt(data[j][2]));
                    }
                    else{
                        otherCount= otherCount+parseInt(data[j][2]);
                    }
                    j++;
                    data[j]=  dashBoardReq[i+j].split("|");
                }while(data[0][3]==data[j][3]);
                if(j==1){
                    vend1.push('');
                    vend2.push('');
                    vend3.push('');
                    vend4.push('');
                    others.push('');
                    vendCount1.push(parseInt(0));
                    vendCount2.push(parseInt(0));
                    vendCount3.push(parseInt(0));
                    vendCount4.push(parseInt(0));
                    othersCount.push(parseInt(0));
                }
                else if(j==2){
                    vend2.push('');
                    vend3.push('');
                    vend4.push('');
                    others.push('');
                    vendCount2.push(parseInt(0));
                    vendCount3.push(parseInt(0));
                    vendCount4.push(parseInt(0));
                    othersCount.push(parseInt(0));
                }
                else if(j==3){
                    vend3.push('');
                    vend4.push('');
                    others.push('');
                    vendCount3.push(parseInt(0));
                    vendCount4.push(parseInt(0));
                    othersCount.push(parseInt(0));
                }
                else if(j==4){
                    vend4.push('');
                    others.push('');
                    vendCount4.push(parseInt(0));
                    othersCount.push(parseInt(0));
                }
                else if(otherCount>0){
                    othersCount.push(parseInt(otherCount));
                    others.push(data[j-1][0]+",Others,"+otherCount)
                }
                i=i+j;
            }   
        }
        showClientChart(month,vend[0],vendCount[0],vend[1],vendCount[1],vend[2],vendCount[2],vend[3],vendCount[3],vend[4],vendCount[4],othersCount,others);
    
    }
    else{
        $("#clientResourceChart").css('visibility', 'hidden');
        var row = $("<tr />")
        $("#clientResourceDashboardResults").append(row);
        row.append($('<td colspan="7"><font style="color: red;font-size: 15px;">No Records to display</font></td>'));
        $(".page_option").css('display', 'none');
    }
    $('#clientResourceDashboardResults').tablePaginate({
        navigateType:'navigator'
    },recordPage);
    pager.init(); 
   
}

function showClientChart(month,vend1,vendCount1,vend2,vendCount2,vend3,vendCount3,vend4,vendCount4,vend5,vendCount5,othersCount,others)
{
    //    alert(month.length);
    var Combined = new Array();
    Combined[0] = ['Month', vend1,{
        type : 'string',
        role: 'tooltip'
    },
    vend2,{
        type : 'string',
        role: 'tooltip'
    },
    vend3,{
        type : 'string', 
        role: 'tooltip'
    },
    vend4,{
        type : 'string',
        role: 'tooltip'
    },
    vend5,{
        type : 'string',
        role: 'tooltip'
    },
    others,{
        type:'string',
        role:'tooltip'
    }];
    for (var i = 0; i < 10; i++){
        Combined[i + 1] = [ month[i], vendCount1[i],vend1[i],vendCount2[i],vend2[i],vendCount3[i],vend3[i],
        vendCount4[i],vend4[i],vendCount5[i],vend5[i],othersCount[i],others[i]];
    }
    //second parameter is false because first row is headers, not data.
    var data = google.visualization.arrayToDataTable(Combined, false);
    var options = {
        colors: ['#0000FF', '#00FF00', '#FF0000','#00BFFF'],
        legend: 'none',
        vAxis: {
            title: " Resources Required",
            titleColor: "green"
        },
        hAxis: {
            title: "Clients",
            titleColor: "green"
        }
    //        isStacked : true
    }
    var chart = new google.visualization.ColumnChart(document.getElementById('clientResourceChart'));
    function selectHandler() {
        var selection = chart.getSelection()[0];
        if (selection) {
            var practice = (data.getValue(selection.row,selection.column+1));
            getClientResourceDashboardList(practice);
        }
    }
    google.visualization.events.addListener(chart, 'select', selectHandler);
    chart.draw(data, options);
    $(window).resize(function () {
        chart.draw(data, options);
    });
}

function getClientResourceDashboardList(selectedValue){
    //    var subprojectsMap=document.getElementById("subprojectsMap").value;
    //   alert("subprojectsMap-->"+subprojectsMap);
    
    var flags=selectedValue.split("FLAG");
    var addList=flags[0].split(",");
    var accountName = addList[0];
    var reqName = addList[1];
    //    var accountName = addList[0];
    //    for(var k=0;k<addList.length-1;k++){        
    //        
    //    }
    //    var dashYears=$('#dashBoardYear').val();
    var url='../turnip/clientRequirementDetails.action?accountName='+accountName+'&reqName='+reqName;
    //    document.getElementById("resouresDiv").style.display = 'none';   
    var req=initRequest(url);
    req.onreadystatechange = function() {
        //        document.getElementById('loadingDashboardPage').style.display = 'block';
        if (req.readyState == 4 && req.status == 200) {
            //            $('#loadingDashboardPage').hide();
            populateClientRequirementDashboard(req.responseText,selectedValue);
        } 
    };
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    return false;
}
function populateClientRequirementDashboard(response){
    var dashBoardReq=response.split("^");alert(response)
    var month = new Array();
    var vend1 =new Array();
    var vendCount1 =new Array();
    var vend2 =new Array();
    var vendCount2 =new Array();
    var vend3=new Array();
    var vendCount3 =new Array();
    var vend4=new Array();
    var vendCount4 =new Array();
    var vend0=new Array();
    var vendCount0 =new Array();
    var othersCount=new Array();
    var others=new Array();
    if(response.length!=0){
        for(var i=0;i<dashBoardReq.length-1;i++){   
            var Values=dashBoardReq[i].split("|");
            {  
                month.push(Values[0]);
                vend0.push(parseInt(Values[2]));
                vend1.push((Values[3]+'-->'+Values[2]));
            }
        }
        showClientRequirementChart(month,vend0,vend1);
    
    }
    else{
        $("#subClientRequirementChart").css('visibility', 'hidden');
    }
}

function showClientRequirementChart(month,vend1,vendCount1)
{
    //    alert(month.length);
    var Combined = new Array();
    Combined[0] = ['Month', vendCount1,{
        type : 'string', 
        role: 'tooltip'
    }];
    for (var i = 0; i < month.length; i++){
        Combined[i + 1] = [ month[i], vend1[i], vendCount1[i]];
    }
    //second parameter is false because first row is headers, not data.
    var data = google.visualization.arrayToDataTable(Combined, false);
    var options = {
        colors: ['#0000FF', '#00FF00', '#FF0000','#00BFFF'],
        legend: 'none',
        vAxis: {
            title: " Resources Required",
            titleColor: "green"
        }
    //        isStacked : true
    }
    var chart = new google.visualization.ColumnChart(document.getElementById('subClientRequirementChart'));
    chart.draw(data, options);
    $(window).resize(function () {
        chart.draw(data, options);
    });
}

//function clientResourceDashboard(response,selectedValue){
//    $("#subProjectsBarchart").css('visibility', 'visible');
//    $("#norecords").css('visibility', 'hidden');
//    var dashBoardReq=response.split("^");
//    var project = new Array();
//    var workedHrs=new Array();
//    var targetHrs =new Array();
//    if(response.length!=0){
//        if(response=="noresources"){
//            document.getElementById("resouresDiv").style.display = 'block';
//            document.getElementById("resourcesnorecords").style.display = 'block';
//            document.getElementById('resorceschartTitle').innerHTML = "<font color=red >&nbsp; "+ selectedValue +" </font><font color=green>Project Resources Hours Analysis</font>";
//  
//            document.getElementById('resourcesnorecords').innerHTML = "<font color=red> No Resources to Display!</font>";
//            document.getElementById("BarchartForResources").style.display = 'none';
//            document.getElementById("resorceschartTitle").style.display = 'none';
//        }
//        else
//        {
//            var subprojectsMap="";
//            var mainprojectsList="";
//            for(var i=0;i<dashBoardReq.length-1;i++){   
//                var Values=dashBoardReq[i].split("|");
//                {  
//                    project.push(Values[0]);
//                    targetHrs.push(parseInt(Values[1]));
//                    workedHrs.push(parseInt(Values[2]));
//
//                    var subProjects=Values[5];
//                    if(subProjects=="mainprojects"){
//                        mainprojectsList=mainprojectsList+Values[3]+"="+Values[0]+"^";
//                        document.getElementById("mainprojectsList").value=mainprojectsList;
//
//                        document.getElementById("Barchart").style.display = 'block';
//                    }
//                    if(subProjects=="subprojects"){
//                        //   alert("in if-->")
//                        subprojectsMap=subprojectsMap+Values[3]+"="+Values[0]+"^";
//                        document.getElementById("subProjectsnorecords").style.display = 'none';
//                        document.getElementById("subProjectsDiv").style.display = 'block';
//                        document.getElementById("subProjectsBarchart").style.display = 'block';
//                        document.getElementById("subprojectsMap").value=subprojectsMap;
//                      
//                    }
//                    
//                    
//                    var resourceHours=Values[3];
//                //  alert("Sub project ids"+Values[3]);
//                
//                //                if(costcenterResponse=="costcenterpojectresponse"){
//                //                //  $('<option>').val(Values[5]).text(Values[6]).appendTo($select);    
//                //                }
//                //alert(month);
//                }
//            }
//            //   alert(project);
//            //  alert(targetHrs);
//            //  alert(workedHrs);
//            //            if(subProjects=="subprojects"){
//            //                //  alert("in if")
//            //                document.getElementById("subProjectsSelectDiv").style.display = 'block';
//            //            //            // $("#costCentersSelectDiv").css('visibility', 'visible'); 
//            //            }
//            if(resourceHours=="resourceworkedhrs")
//            {
//                //   alert(resourceHours);
//                document.getElementById("resouresDiv").style.display = 'block';
//                document.getElementById("BarchartForResources").style.display = 'block';
//                document.getElementById("resorceschartTitle").style.display = 'block';
//                document.getElementById("resourcesnorecords").style.display = 'none'; 
//            }
//        
//            // alert(costcenterResponse);
//            showProjectsChart(project,targetHrs,workedHrs,subProjects,resourceHours,selectedValue);
//        
//        }
//    //  alert("subprojectsMap-->"+subprojectsMap);
//        
//        
//    //  $("#Barchart").css('visibility', 'hidden');
//    //  $("#norecords").css('visibility', 'visible');
//    //  document.getElementById('norecords').innerHTML = "<font color=red> No Records to Display!</font>";
//    //  $("#resouresDiv").css('visibility', 'hidden');
//    //  $("#resourcesnorecords").css('visibility', 'visible');
//    //  document.getElementById('resourcesnorecords').innerHTML = "<font color=red> No Records to Display!</font>";
//        
//        
//    }
//}
//
//function showProjectsChart(project,targetHrs,workedHrs,subProjects,resourceHours,selectedValue)
//{
//    //    alert("showProjectsChart-->"+subProjects);
//    //    var quarter=$('#quarter').val();
//    //    if(quarter=="DF"){
//    //        document.getElementById("costCentersSelectDiv").style.display = 'none';   
//    //    //$("#costCentersSelectDiv").css('visibility', 'hidden');
//    //    // var v=document.getElementById("costCenters").value;
//    //    // document.getElementById("costCenters").value=-1;
//    //    }
//    var Combined = new Array();
//    //    if(costcenterResponse=="costcenterresponse"){
//    //        Combined[0] = ['Cost Center','Budget Amount', 'Consumed Amount','Balance Amount'];  
//    //    }
//    //    else if(costcenterResponse=="costcenterpojectresponse"){
//    //        Combined[0] = ['Projects','Budget Amount', 'Consumed Amount','Balance Amount'];  
//    //    }
//    //    else
//    //    {
//    if(resourceHours=="resourceworkedhrs"){
//        Combined[0] = ['Projects','Consumed Hours']; // 
//    }
//    else
//    {
//        Combined[0] = ['Projects','Target Hours', 'Worked Hours'];   
//    }
//     
//    //    }
//    if(resourceHours=="resourceworkedhrs"){
//        for (var i = 0; i < project.length; i++){
//            Combined[i + 1] = [ project[i], targetHrs[i]];
//        } 
//    }
//    else
//    {
//        //  alert("subProjects-->"+subProjects);
//        for (var i = 0; i < project.length; i++){
//            Combined[i + 1] = [ project[i], targetHrs[i], workedHrs[i] ];
//        }
//    }
//    //second parameter is false because first row is headers, not data.
//    var data = google.visualization.arrayToDataTable(Combined, false);
//    // alert("main Projects data-->"+data);
//    if(subProjects=="mainprojects"){
//        document.getElementById('chartTitle').innerHTML = "<font color=green>Projects Analysis</font>";
//        var options = {
//            //        width: 370,
//            //        height:300,
//            // title: 'Cost Centers Yearly Analysis',
//            colors: ['#0000FF', '#00FF00'],
//            titleColor:"green",
//            'is3D':true,
//            // backgroundColor: '#1b1b1b',
//            vAxis: {
//                title: "Hours",
//                titleColor:"green"
//            //                textStyle: {color: '#24BEFF'}
//            },
//            hAxis: {
//                title: "Main Projects",
//                titleColor:"green"
//            //                textStyle: {color: '#24BEFF'}
//            },
//            legend: {
//                position: 'top', 
//                alignment: 'center'
//            }
//        }
//    }
//    else if(resourceHours=="resourceworkedhrs"){
//        // document.getElementById("resouresDiv").style.display = 'block';
//        //  var v=null;
//        document.getElementById('resorceschartTitle').innerHTML = "<font color=red >&nbsp; "+ selectedValue +" </font><font color=green>Project Resources Hours Analysis</font>";
//        var options = {
//            //        width: 370,
//            //        height:300,
//            //  title: 'Cost Center Projects Yearly Analysis',
//            colors: ['#00FF00'],
//            titleColor:"green",
//            'is3D':true,
//            vAxis: {
//                title: "Project Hours",
//                   
//                titleColor:"green"
//            },
//            hAxis: {
//                title: "Resources",
//                titleColor:"green"
//            },
//            legend: {
//                position: 'top', 
//                alignment: 'center'
//            }
//        }
//    }
//    else
//    {
//        //  alert("in ");
//        // var v=null;
//        document.getElementById('subProjectsTitle').innerHTML = "<font color=red >&nbsp; "+ selectedValue +" </font><font color=green>Sub Project(s) Hours Analysis</font>";
//      
//        // document.getElementById('subProjectsTitle').innerHTML = "<font color=green><b>Project Hours Analysis</b></font>";
//        var options = {
//            
//            //        width: 370,
//            //        height:300,
//            //  title: 'Budget Analysis',
//            titleColor:"green",
//            colors: ['#0000FF', 'red'],
//            vAxis: {
//                title: "Hours",
//                titleColor:"green"
//            //                textStyle: {color: '#24BEFF'}
//            },
//            hAxis: {
//                title: "Sub Projects",
//                titleColor:"green"
//            //                textStyle: {color: '#24BEFF'}
//            },
//            legend: {
//                position: 'top', 
//                alignment: 'center'
//            }
//           
//        }
//    }
//   
//    if(subProjects=="mainprojects"){
//        //  alert("subProjects-->"+subProjects);
//        var chart = new google.visualization.ColumnChart(document.getElementById('Barchart'));
//        
//        function selectMainProHandlers() {
//            var selectedItem = chart.getSelection()[0];
//            if (selectedItem) {
//                var practice = data.getValue(selectedItem.row, 0);
//                //  alert('The user selected--> '+practice);
//                getProjectDashboardList(practice,"mainprojectsselected");
//            }
//        }
//        google.visualization.events.addListener(chart, 'select', selectMainProHandlers);
//       
//        // Instantiate and draw our chart, passing in some options.
//        chart.draw(data, options);
//        
//        $(window).resize(function () {
//            chart.draw(data, options);
//        });
//    }
//    else if(subProjects=="subprojects"){
//        var chart = new google.visualization.ColumnChart(document.getElementById('subProjectsBarchart'));
//     
//     
//        function selectHandler() {
//            var selectedItem = chart.getSelection()[0];
//            if (selectedItem) {
//                var practice = data.getValue(selectedItem.row, 0);
//                //  alert('The user selected--> '+practice);
//                getProjectDashboardList(practice,"subprojects");
//            }
//        }
//        google.visualization.events.addListener(chart, 'select', selectHandler);
//        // Instantiate and draw our chart, passing in some options.
//        chart.draw(data, options);
//       
//        $(window).resize(function () {
//            chart.draw(data, options);
//        });
//    }
//    //   alert("in if");
//    // document.getElementById("resouresDiv").style.display = 'block';
//    else
//    {
//        var chart = new google.visualization.ColumnChart(document.getElementById('BarchartForResources'));
//       
//        // Instantiate and draw our chart, passing in some options.
//        chart.draw(data, options);
//        
//        $(window).resize(function () {
//            chart.draw(data, options);
//        }); 
//    }
//}


function getRegionResourcesList(){
    $("#RegionResourceChart").css('visibility', 'visible');
    document.getElementById('chartRegionTitle').innerHTML = "<font color=green>Client Resources Requirements Yearly Analysis</font>";

    var dashYears=$('#year').val();
    var dashMonths=$('#month').val();
    //alert("HI "+csrCustomers+"  "+dashYears)
    
    var url='../turnip/clientRegionResourceDetails.action';//?dashYears='+dashYears+'&dashMonths='+dashMonths;
    var req=initRequest(url);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            //alert(req.responseText)
            populateClientRegionResourceDashboardTable(req.responseText);
        } 
    };
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    return false;
}
function populateClientRegionResourceDashboardTable(response){
    $(".page_option").css('display', 'block');
    var dashBoardReq=response.split("^");
    //    var table = document.getElementById("clientResourceDashboardResults");
    var month = new Array();
    var java=new Array();
    var hybris =new Array();
    //    for(var i = table.rows.length - 1; i > 0; i--)
    //    {
    //        table.deleteRow(i);
    //    }
    if(response.length!=0){

        for(var i=0;i<dashBoardReq.length-1;i++){   
            //alert(techReviewList[0])
            var Values=dashBoardReq[i].split("|");
            {  
                //alert(Values[0])
                //                var row = $("<tr />")
                //                $("#clientResourceDashboardResults").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
                //                row.append($("<td>" + Values[0] + "</td>"));
                //                row.append($("<td>" + Values[1] + "</td>"));
                //                row.append($("<td>" + Values[2] + "</td>"));

                month.push(Values[0]);
                java.push(parseInt(Values[1]));
                hybris.push(parseInt(Values[2]));
            }
        }
        showClientRegionChart(month,java,hybris);
    }
    else{
        $("#RegionResourceChart").css('visibility', 'hidden');
    //        var row = $("<tr />")
    //        $("#clientResourceDashboardResults").append(row);
    //        row.append($('<td colspan="7"><font style="color: red;font-size: 15px;">No Records to display</font></td>'));
    //        $(".page_option").css('display', 'none');
    }
//    $('#clientResourceDashboardResults').tablePaginate({
//        navigateType:'navigator'
//    },recordPage);
//    pager.init(); 
   
}

function showClientRegionChart(month,java,hybris)
{
    //alert(month.length);
    //alert(month.length);
     
    var Combined = new Array();
    Combined[0] = ['Month', 'Java', 'Hybris'];
    for (var i = 0; i < month.length; i++){
        Combined[i + 1] = [ month[i], java[i], hybris[i]];
    }
    //second parameter is false because first row is headers, not data.
    var data = google.visualization.arrayToDataTable(Combined, false);
    
    var options = {
        //        width: 370,
        //        height:300,
        // title: 'Customer Requirements Yearly Analysis',
        colors: ['#0000FF', '#00FF00', '#FF0000','#00BFFF'],
        legend: {
            position: 'top', 
            alignment: 'center'
        }
        
    // animation: {
    //duration: 1000,
    //easing: 'linear'
    //vAxis: {
    //viewWindow: {
    //max: 8
    }
    var chart = new google.visualization.ColumnChart(document.getElementById('RegionResourceChart'));
    
    // Instantiate and draw our chart, passing in some options.
    chart.draw(data, options);
  
    $(window).resize(function () {
        chart.draw(data, options);
    });
}

