const sendForm = () => {
    const errorMessage = 'ошибка',
        loadMessage = 'идет отправка',
        successMessage = 'отправлено',
        patternPhone = /^\+?[78](\s|-)?\(?\d{3}\)?\s?(-*\d){7}$/;
    
    document.querySelectorAll('form').forEach((item) => {
        for (let elem of item.elements) {
            elem.required = '';
            elem.addEventListener('input', () => {
                if (elem.name === 'name' && elem.placeholder !== 'Промокод'|| elem.name === 'message') {
                    elem.value = elem.value.replace(/[^а-яё\s]/ig, '');
                }
            });  
        } 
    });
    
    const valid = (event) => {
        for (let elem of event.target.elements) {
            if (elem.name === 'phone' && !patternPhone.test(elem.value)) {
                event.preventDefault();
                elem.classList.add('error');
                elem.value = '+7 (XXX) XXX-XX-XX';
                elem.style.color = 'red';
                return false;   
            } else if (elem.name === 'phone' || patternPhone.test(elem.value)) {
                elem.classList.remove('error');
                return true;
            } else if (elem.name === 'name' && elem.placeholder !== 'Промокод' && elem.value.trim() === '') {
                event.preventDefault();
                return false;
            } else if (elem.name === 'message' && elem.value.trim() === '') {
                event.preventDefault();
                return false;
            } 
        }
    };

    const applyStyle = () => {
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.textContent = `
            body input.error ,
            #card_order input.error,
            footer #callback_footer_form-phone.error,
            #banner-form input.error,
            .popup .form-content input[type='tel'].error{
                border: 2px solid red;
            }
        `;
    };
    applyStyle(); 
    
    const confirmError = (target) => {
        if (!target.querySelector('.confirm-error')) {
            const personalData = target.querySelector('.personal-data');
            let confirmDiv = document.createElement('div');
            confirmDiv.classList.add('confirm-error');
            confirmDiv.textContent = 'Необходимо подтвердить согласие!';
            confirmDiv.style.cssText = `font-size: 1rem; color: red;`;
            personalData.insertAdjacentElement('afterend', confirmDiv);
        } 
    };

    const confirmSuccess = (target) => {
        if(target.querySelector('.confirm-error')) {
            target.querySelector('.confirm-error').remove();
        }
    };
     
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: #ffd11a';

    const sendingForm = () => {
        document.querySelectorAll('form').forEach((forma) => {
            forma.addEventListener('submit', (event) => {
                let target = event.target;
                const checkboxElem = target.querySelector('input[type="checkbox"]'),
                    radioElem = target.querySelector('input[type="radio"]'),
                    thanksModalWindow = document.querySelector('#thanks'),
                    thanksFormContent = thanksModalWindow.querySelector('.form-content');
                
                event.preventDefault();
                const formData = new FormData(forma);
                let body = {},
                    i = 0;
        
                if (!valid(event)) {
                    return;
                }                
                    
                formData.forEach((val, key) => {
                    if (key !==  'form_name') {
                        if (key === 'name') {
                            if (val) {
                                body[key + i] = val;
                                i++;
                            }
                        } else {
                            body[key] = val;
                        }
                    } 
                });

                if (checkboxElem && checkboxElem.checked === true) {
                    body[checkboxElem.type] = checkboxElem.value;
                    statusMessage.textContent = loadMessage;
                } else if (checkboxElem && !checkboxElem.checked){
                    confirmError(target);
                    return;
                }

                confirmSuccess(target);
                forma.appendChild(statusMessage);

                postData(body)
                    .then ((response) => {
                        if (response.status !== 200) {
                            throw new Error('status network not 200');
                        }

                        if (forma.id === 'form2' || forma.id === 'form1') {
                            forma.innerHTML = `<h4>Записаться на визит</h4>
                                                <p>${successMessage}</p>`;
                            forma.querySelector('p').style.cssText = `
                            font-size: 21px;
                            color: #ffd11a; 
                            text-transform: uppercase;`;                    
                        } else {
                            thanksModalWindow.style.display = 'block';
                        
                            [...forma.elements].forEach((item) => {
                                item.value = '';
                            });
                        }

                        statusMessage.textContent = '';
                    })
                    .catch((error) => {
                        if (forma.id === 'form2' || forma.id === 'form1') {
                            forma.innerHTML = `<h4>Записаться на визит</h4>
                                                <p>${errorMessage}</p>
                                                <p>Отправка не удалась!</p>`;
                            forma.style.cssText = `
                            font-size: 21px;
                            color: #ffd11a; 
                            text-transform: uppercase;`;                    
                        } else {
                            thanksModalWindow.style.display = 'block';
                            
                            thanksFormContent.innerHTML = `<h4>Ошибка</h4>
                                                        <p>Отправка не удалась!</p>`;

                            thanksFormContent.style.cssText = `
                            font-size: 21px;
                            color: #ffd11a; 
                            display: block;`;                            
                        }
                        statusMessage.textContent = '';
                    }); 
            });
        });
        
    };
    sendingForm();

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
    };
};

export default sendForm;