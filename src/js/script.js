$(() => {
  $(window).on('scroll', function (e) {
    $('.dropdown-toggle').dropdown('hide')
  })
  $('.dropdown-toggle').on('mouseenter', function (e) {
    $(this).dropdown('show').parent().siblings('.dropdown').children('.dropdown-toggle').dropdown('hide')
  })
  $('.dropdown-menu').on('mouseleave', function (e) {
    $(this).prev().dropdown('hide')
  })

  $('.scroll-href').on('click', function (e) {
    let href = $($(this).attr('href')).offset().top - $('header').outerHeight()
    $('html, body').animate({ scrollTop: href })
  })

  //   $(window).on('resize', function() {
//     $('.active').removeClass('active')
//     $().collapse('hide')
//     $().dropdown('hide')
//   })
//   $(window).on('scroll', function() {
//   if ($(window).height() > 10) {
//     $().addClass('fixed-top')
//   } else {
//     $().removeClass('fixed-top')
//   }
//   $('.active').removeClass('active')
//   $().collapse('hide')
//   $().dropdown('hide')
//   })
//   $('.overlay').on('scroll', function() {
//     event.stopPropagation()
//   })
//   $('.overlay').on('click', function() {
//     $(this).removeClass('active')
//   })
})
