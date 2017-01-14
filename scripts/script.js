$(document).ready(function(){
    registerNavigationEvents();
})

function registerNavigationEvents(){
    $('nav ul li a').click(function() {
        var relatedPage = $(this).data('page-link');

        navigateToPage(relatedPage);
    });


    $('a.button-read-more').click(function() {
        navigateToPage('program');
        return false;
    });

    $('a.button-continue').click(function() {
        navigateToPage('application');
    });
}

function navigateToPage(pageKey){
    if(pageKey == 'startpage'){
        $('.hero').show();
    }else {
        $('.hero').hide();
    }
    $('.content-container.page').removeClass('active');
    $('[data-page="' + pageKey + '"]').addClass('active');

    $('nav ul li a').removeClass('active');
    $('nav ul li a[data-page-link="' + pageKey + '"]').addClass('active');
}