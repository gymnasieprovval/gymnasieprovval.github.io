$(document).ready(function(){
    registerNavigationEvents();
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