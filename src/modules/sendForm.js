const sendForm = () => {
    const errorMessage = 'ошибка',
        loadMessage = 'идет отправка',
        successMessage = 'отправлено',
        patternPhone = /^\+?[78](\s|-)?\(?\d{3}\)?\s?(-*\d){7}$/;
    
    document.querySelectorAll('form').forEach((item) => {
        for (let elem of item.elements) {
            elem.required = '';
            elem.addEventListener('input', () => {
                if (elem.name === 'name' || elem.name === 'message') {
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
            } else if (elem.name === 'name' && elem.value.trim() === '') {
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
     
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: #ffd11a';

    const sendingForm = () => {
        document.querySelectorAll('form').forEach((forma) => {
            forma.addEventListener('submit', (event) => {
                
                const checkboxElem = event.target.querySelector('input[type="checkbox"]');
        
                if (!valid(event)) {
                    return;
                }                
            
                event.preventDefault();
                forma.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                const formData = new FormData(forma);
                let body = {},
                    i = 0;

                    
                formData.forEach((val, key) => {
                    if (key !==  'form_name') {
                        if (key === 'name') {
                            body[key + i] = val;
                            i++;
                        } else {
                            body[key] = val;
                        }
                    } 
                });

                if (checkboxElem && checkboxElem.checked) {
                    body[checkboxElem.type] = checkboxElem.value;
                }
                
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
                            statusMessage.textContent = successMessage;
                        
                            [...forma.elements].forEach((item) => {
                                item.value = '';
                            });
                        }

                        
                    })
                    .catch((error) => {
                        if (forma.id === 'form2' || forma.id === 'form1') {
                            forma.innerHTML = `<h4>Записаться на визит</h4>
                                                <p>${errorMessage}</p>`;
                            forma.querySelector('p').style.cssText = `
                            font-size: 21px;
                            color: #ffd11a; 
                            text-transform: uppercase;`;                    
                        } else {
                            statusMessage.textContent = errorMessage;
                        }
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