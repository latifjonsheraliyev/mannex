const user = JSON.parse(localStorage.getItem('user')) || {};  
const userInfo = document.querySelector('.main_p_info');

function getUserInfo(field, defaultValue) {
  return user[field] ? user[field] : defaultValue;
}

userInfo.innerHTML = `
  <div class="info_">
    <p class="info_p_1">Вариант регистрации</p>
    <p class="info_p">${getUserInfo('firstName', 'hakob')}</p>
  </div>
  <div class="info_">
    <p class="info_p_1">ID пользователя</p>
    <p class="info_p">${getUserInfo('id', '1')}</p>
  </div>
  <div class="info_">
    <p class="info_p_1">E-mail</p>
    <p class="info_p">${getUserInfo('email', 'example@mail.ru')}</p>
  </div>
  <br>
  <div class="info_">
    <p class="info_p_1">Фамилия</p>
    <p class="info_p">${getUserInfo('lastName', 'hakobyan')}</p>
  </div>
  <div class="info_">
    <p class="info_p_1">Имя</p>
    <p class="info_p">${getUserInfo('firstName', 'Hakob')}</p>
  </div>
  <div class="info_">
    <p class="info_p_1">Отчество</p>
    <p class="info_p">${getUserInfo('middleName', 'hakobi')}</p>
  </div>
  <br><br>
  <div class="info_">
    <p class="info_p_1">Группы пользователя</p>
    <p class="info_p">Розница</p>
  </div>
`;
