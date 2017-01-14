var selectedProgramStep1;
var selectedProgramsStep2 = [];
var meritScore;

$(document).ready(function(){
    registerNavigationEvents();
    var firstPage = window.location.hash;

    if(firstPage) {
        navigateToPage(firstPage.replace('#', ''));
    }

    loadPrograms();
})

function registerNavigationEvents(){
    $('.nav').click(function() {
        var relatedPage = $(this).data('page-link');

        navigateToPage(relatedPage);
    });
}

function navigateToPage(pageKey){
    if(pageKey == 'startpage'){
        setTimeout(function() {
            $('.hero-content').show();
        }, 250);
        $('.hero').removeClass('hidden');

    }else {
        $('.hero-content').hide();
        $('.hero').addClass('hidden');
    }
    $('.content-container.page').removeClass('active');
    setTimeout(function(){
        $('.content-container.page').hide();
        $('[data-page="' + pageKey + '"]').show().addClass('active');
    }, 250);

    $('nav ul li a').removeClass('active');
    $('nav ul li a[data-page-link="' + pageKey + '"]').addClass('active');
}

function loadPrograms(){
    /*$.getJSON( "content/program.json", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            items.push( "<li id='" + key + "'>" + val + "</li>" );
        });

        $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
        }).appendTo("#application-programs");
    });*/

    $.each(programs, function(index, oneProgram){
       buildApplicationProgram(oneProgram, $('#application-programs'));
        buildApplicationProgram(oneProgram, $('#application-programs-step2'));
    });

    registerStep1ApplicationEvents();
    registerStep2ApplicationEvents();
    registerStep3ApplicationEvents();
    enableBackButtons();
}

function buildApplicationProgram(program, elementToAppend){
    var programElement = $('<div class="one-program"><div class="program-content" /><div class="program-selector" /></div>');

    programElement.children('.program-content').append('<div class="name">' + program.name + '</div>');

    programElement.children('.program-content').append('<div class="description">' + program.description + '</div>');
    programElement.children('.program-content').append('<a href="#" class="read-more">Läs mer</a>');

    programElement.children('.program-selector').append('<a href="#" class="select-program">Välj program</a>');

    programElement.data('program-object', program);

    elementToAppend.append(programElement);
}

function setSelectedItemStep1(selectedProgram){
    selectedProgramStep1 = selectedProgram;
}

function registerStep1ApplicationEvents(){
    $('#application-step1 .one-program a.select-program').click(function(){

        $('#application-step1 .one-program a.select-program').text('Välj program');
        $(this).parents('.one-program').toggleClass('selected');
        $(this).parents('.one-program').siblings('.one-program').removeClass('selected');
        $('#application-step1 .one-program.selected a.select-program').text('Ditt val');
        if($('#application-step1 .one-program.selected').length > 0){
            $('a#application-step1-done').addClass('active');
            $('#application-step1-failed').addClass('hidden');
            setSelectedItemStep1($(this).parents('.one-program').data('program-object'));
        }else{
            $('a#application-step1-done').removeClass('active');
        }

        return false;
    });

    $('#application-step1-done').click(function(){
        if($(this).hasClass('active')){
            $('.application-step').hide();
            $('#application-step2').show();
            $('html, body').animate({ scrollTop: 0 }, 'fast');
            updateSelections();
        }else{
            $('#application-step1-failed').removeClass('hidden');
        }

        return false;
    });
}

function setSelectedItemsStep2(){
    selectedProgramsStep2 = [];

    $.each($('#application-step2 .one-program.selected'), function(index, selectedElement){
        selectedProgramsStep2.push($(selectedElement).data('program-object'));
    });

}

function registerStep2ApplicationEvents(){
    $('#application-step2 .one-program a.select-program').click(function(){

        $('#application-step2 .one-program a.select-program').text('Välj program');
        $(this).parents('.one-program').toggleClass('selected');
        $('#application-step2 .one-program.selected a.select-program').text('Vald');
        setSelectedItemsStep2();

        return false;
    });

    $('#application-step2-done').click(function(){

        $('#application-step2').hide();
        $('#application-step3').show();

        updateSelections();

        return false;
    });
}

function registerStep3ApplicationEvents(){
    $('#input-merit-score').focus(function() {
        $(this).parent().addClass('active');
        console.log('test');
    });

    $('#input-merit-score').blur(function() {
        $(this).parent().removeClass('active');
    });

    $( "#input-merit-score" ).keyup(function() {
        var meritScore = $(this).val();

        if(meritScore.length < 1 || isNaN(meritScore) || meritScore > 350){
            $('a#application-step3-done').removeClass('active');
        }else{
            $('a#application-step3-done').addClass('active');
            $('#application-step3-failed').addClass('hidden');
        }
    });

    $('#application-step3-done').click(function(){

        if($(this).hasClass('active')){
            $('#application-step3').hide();
            $('#application-result').show();
            Number(meritScore = $('#input-merit-score').val());
            updateSelections();
            calculateResults();
        }else {
            $('#application-step3-failed').removeClass('hidden');
        }

        return false;
    });


}

function enableBackButtons() {
    $('a.application-back-button').click(function () {
        var currentStep = Number($(this).parents('.application-step').data('step'));

        if(currentStep && currentStep > 1){
            $('.application-step').hide();
            $('.application-step[data-step="' + (currentStep-1) + '"]').show();
        }

        return false;
    });
}

function updateSelections(){
    $('ul#selected-step1').empty()
    if(selectedProgramStep1) {
        $('ul#selected-step1').append($('<li class="value">' + selectedProgramStep1.name +'</li>'));
    }else {
        $('ul#selected-step1').append($('<li>-</li>'));
    }

    $('ul#selected-step2').empty()
    if(selectedProgramsStep2 && selectedProgramsStep2.length > 0) {
        $.each(selectedProgramsStep2, function (index, program) {
                $('ul#selected-step2').append($('<li class="value">' + program.name +'</li>'));
        });
    } else {
        $('ul#selected-step3').append($('<li>-</li>'));
    }

    $('ul#selected-step3').empty()
    if(meritScore){
        $('ul#selected-step3').append($('<li class="value">' + meritScore +'</li>'));
    }else {
        $('ul#selected-step3').append($('<li>-</li>'));
    }

}