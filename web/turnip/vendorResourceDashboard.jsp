<%--
    Document   : Requirements Dashboard Page
    Created on : September 21st 2016, 05:05:05 PM
--%>

<%@ page contentType="text/html; charset=UTF-8" errorPage="../exception/403.jsp"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
    <head>
        <!-- new styles -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ServicesBay :: Vendor Resources Page</title>
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/bootstrap.min.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/font-awesome.min.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/animate.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/main.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/responsive.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/general/GridStyle.css"/>">
        <link rel="stylesheet" type="text/css" href='<s:url value="/includes/css/general/profilediv.css"/>'>

        <script type="text/JavaScript" src="<s:url value="/includes/js/general/jquery.min.js"/>"></script>

        <script type="text/JavaScript" src="<s:url value="/includes/js/main.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/js/bootstrap.min.js"/>"></script>

        <script type="text/JavaScript" src="<s:url value="/includes/js/general/jquery.toggle.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/js/jquery.js"/>"></script>
        <script language="JavaScript" src='<s:url value="/includes/js/general/sortable.js"/>'></script>
        <script language="JavaScript" src='<s:url value="/includes/js/Ajax/turnipAjax.js"/>'></script>

        <script type="text/javascript" src="<s:url value="/includes/js/general/glinechart.js"/>"></script>

        <script>
//            var pager;
//            //$(document).ready(function(){
//            function vendorResourceDashboard(){
//                //alert("hi")
//                var paginationSize = 5;
//                pager = new Pager('vendorResourceDashboardResults', paginationSize);
//                pager.init();
//                pager.showPageNav('pager', 'pageNavPosition');
//                // document.getElementById("paginationOption").value=10;
//                
//                pager.showPage(1);
//            };

            //            function pagerOption(){
            //
            //                paginationSize = document.getElementById("paginationOption").value;
            //                if(isNaN(paginationSize))
            //                    alert(paginationSize);
            //
            //                pager = new Pager('customerDashboardResults', parseInt(paginationSize));
            //                pager.init();
            //                pager.showPageNav('pager', 'pageNavPosition');
            //                pager.showPage(1);
            //
            //            };
            
        </script>

    </head>
    <body style="overflow-x: hidden" oncontextmenu="return false" onload=" getVendorResourceList();getNoofProjectResourcesRequired();"> <!getVendorResouceDashboard-->
        <div id="wrap">
            <header id="header"><!--header-->
                <div class="header_top"><!--header_top-->
                    <div class="container">
                        <s:include value="/includes/template/header.jsp"/>
                    </div>
                </div>
            </header>
            <div id="main">
                <section id="generalForm"><!--form-->
                    <div  class="container">
                        <div class="row">
                            <s:include value="/includes/menu/LeftMenu.jsp"/>
                            <!-- content start -->
                            <div class="col-sm-12 col-md-9 col-lg-9 right_content" style="background-color:#fff">
                                <div class="features_items">
                                    <div class="col-sm-12 ">
                                        <div class="" id="profileBox" style="float: left; margin-top: 5px">
                                            <div class="backgroundcolor" >
                                                <div class="panel-heading">
                                                    <h4 class="panel-title">
                                                        <!--<span class="pull-right"><a href="" class="profile_popup_open" ><font color="#DE9E2F"><b>Edit</b></font></a></span>-->
                                                        <font color="#ffffff">Requirements</font>
                                                        <i id="updownArrow" onclick="toggleContent('customerDashboardForm')" class="fa fa-minus"></i> 
                                                    </h4>
                                                </div>
                                            </div>
                                            <span> <br/></span>
                                            <!-- content start -->
                                            <span id="VendorResourceDashValidation"> </span>
                                            <div class="col-sm-12">
                                                <s:form theme="simple" id="customerDashboardForm">

                                                    <div class="inner-reqdiv-elements">
                                                        <div class="row">
                                                            <div class="col-sm-2">
                                                                <label class="" style="color:#56a5ec;">Year </label>
                                                                <s:textfield cssClass="form-control" id="year"
                                                                             name="year" placeholder="Year" 
                                                                             onkeypress="return validationVendorResourceDashboardYear(event)"
                                                                             tabindex="1"
                                                                             />
                                                            </div>
                                                            <div class="col-sm-2">
                                                                <label class="" style="color:#56a5ec;">Month </label>
                                                                <s:select id="month" cssClass="form-control SelectBoxStyles" name="month" headerKey="-1" headerValue="All" list="#@java.util.LinkedHashMap@{'01':'January','02':'February','03':'March','04':'April','05':'May','06':'June','07':'July','08':'August','09':'September','10':'October','11':'November','12':'December'}" tabindex="2" />
                                                            </div>

                                                            <div class="col-sm-2">
                                                                <div class="row">
                                                                    <div class="col-sm-11 pull-right">
                                                                        <label class="" style="color:#56a5ec;"></label> 
                                                                        <%--<s:submit type="submit" cssClass="cssbutton_emps form-control"
                                                                                value="Search" onclick="getVendorDashboardList();"/> --%>
                                                                        <a href="#" id="dashboardSearch"><button  type="button" class="add_searchButton form-control" value="" style="margin:5px 0px;" onclick="getVendorResourceList();" tabindex="3" ><i class="fa fa-search"></i>&nbsp;Search</button></a>
                                                                    </div>
                                                                </div>
                                                            </div>   
                                                        </div>
                                                    </div>
                                                </div>


                                                <%--div class="row">
                                                    <div class="col-sm-4"> <s:submit type="submit" cssClass="cssbutton_emps field-margin"
                                                              value="Search" cssStyle="margin:0px"/></div>
                                                    <div class="col-sm-4"></div>
                                                </div--%>

                                            </s:form>
                                            <span> <br/></span>
                                                <%--<s:submit cssClass="css_button" value="show"/><br>--%>
                                            <div class="col-sm-12">
                                                <s:hidden id="accountSearchID" value="%{id}" ></s:hidden>

                                                <%--  <s:form>
                                                        <div class="emp_Content" id="emp_div" align="center" style="display: none"    >
                                                             <table id="vendorResourceDashboardResults" class="responsive CSSTable_task" border="5">
                                                                 <tbody>
                                                                     <tr>
                                                                     <th>Requirement&nbsp;Name</th>
                                                                     <th>Vendor&nbsp;Name </th>
                                                                     <th>No.Of&nbsp;Resources</th>
                                                                     
                                                                 </tr>

                                                            </tbody>
                                                        </table>
                                                        <br/>
                                                        <label class="page_option"> Display <select id="paginationOption" class="disPlayRecordsCss" onchange="pagerOption()" style="width: auto">
                                                                <option>5</option>
                                                                <option>10</option>
                                                                <option>12</option>
                                                            </select>
                                                            Months per page
                                                        </label>
                                                        <div align="right" class="pull-right" id="pageNavPosition" style="margin-right: 0vw;display: none"></div>
                                                    </s:form>
                                                    <script type="text/javascript">
                                                        var dashPager = new Pager('vendorResourceDashboardResults', 10);
                                                        dashPager.init();
                                                        dashPager.showPageNav('dashPager', 'pageNavPosition');
                                                        dashPager.showPage(1);
                                                    </script>
                                                </div>--%>
                                            </div>
                                        </div>
                                    </div>



                                    <%--close of future_items--%>




                                    <div class="col-sm-12" >
                                        <div class="col-lg-12 panel panel-default panel-heading">
                                            <i class="fa fa-bar-chart-o fa-fw"></i>Bar Chart<div align="center"><span id="chartTitle"></span></div>
                                            <div id="vendorResourceChart"></div>

                                        </div>
                                    </div>
                                    <div class="col-sm-12" id="subProjectsDiv" style="display: none">
                                        <div class="col-lg-12 panel panel-default panel-heading">
                                            <i class="fa fa-bar-chart-o fa-fw"></i>Bar chart<div align="center"><span id="subProjectsTitle"></span></div>
                                            <br>
                                            <span id="subProjectsnorecords"></span>
                                            <div id="subProjectsBarchart"></div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12" >
                                        <div class="col-lg-12 panel panel-default panel-heading">
                                            <i class="fa fa-bar-chart-o fa-fw"></i>Bar Chart<div align="center"><span id="ProjectTitle"></span></div>
                                            <div id="projectResource"></div>

                                        </div>
                                    </div>
                                    
                                </div>
                            </div>


                        </div>
                    </div>        <!-- content end -->
                </section><!--/form-->
            </div>
        </div>

        <footer id="footer"><!--Footer-->
            <div class="footer-bottom" id="footer_bottom">
                <div class="container">
                    <s:include value="/includes/template/footer.jsp"/>
                </div>
            </div>
        </footer><!--/Footer-->
        <script type="text/javascript" src="<s:url value="/includes/js/general/pagination.js"/>"></script> 
        <script type="text/JavaScript" src="<s:url value="/includes/js/jquery.scrollUp.min.js"/>"></script>
        <script type="text/javascript">
//            var recordPage=5;
//            function pagerOption(){
//
//                var paginationSize = document.getElementById("paginationOption").value;
//                if(isNaN(paginationSize))
//                {
//                       
//                }
//                recordPage=paginationSize;
//                // alert(recordPage)
//                $('#vendorResourceDashboardResults').tablePaginate({navigateType:'navigator'},recordPage);
//
//            };
//            $('#vendorResourceDashboardResults').tablePaginate({navigateType:'navigator'},recordPage);
        </script>
        <script type="text/JavaScript" src="<s:url value="/includes/js/general/placeholders.min.js"/>"></script>

    </body>
</html>
