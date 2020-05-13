const pageIndication = (event) => {
  let span = document.querySelectorAll('.pages');
  let element = document.getElementById(event);
  for (var i = 0; i < span.length; i++) {
    span[i].classList.remove('active');
  }
  element.classList.add('active');
};

export default pageIndication;
