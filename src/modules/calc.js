const calc = () => {
    const calcForm = document.querySelector('#card_order'),
        priceTotal = document.querySelector('#price-total'),
        promotionalСode = 'ТЕЛО2019',
        schelkovo = {
            '1': 2999,
            '6': 14990,
            '9': 21990,
            '12': 24990
        },
        mozaika = {
            '1': 1999,
            '6': 9900,
            '9': 13900,
            '12': 19900
        };
    
    let promoDiv = calcForm.querySelector('.price-message'),
        cardTypeVal,
        clubNameVal,
        targetValue = '',
        inputDiv;

    if (promoDiv) {
        inputDiv = promoDiv.querySelector('input');
    }    
   
    [...calcForm].forEach(item => {
        if(item.checked && item.name === 'card-type') {
            cardTypeVal = item.value;
        } else if(item.checked && item.name === 'club-name') {
            clubNameVal = item.value;
        
        }

        item.addEventListener('click', (event) => {
            let target = event.target;
            
            if(target.checked && target.name === 'card-type') {
                cardTypeVal = target.value;
            } else if(target.checked && target.name === 'club-name') {
                clubNameVal = target.value;  
            }

            promo(targetValue,cardTypeVal,clubNameVal);
            
        });

    }); 

    const promo = (targetValue,cardTypeVal,clubNameVal) => {
        if (targetValue === undefined) {
            targetValue = '';
        }

        if (targetValue.toUpperCase() === promotionalСode && priceTotal) {
            if (clubNameVal === 'mozaika') { 
                priceTotal.textContent = Math.floor(mozaika[cardTypeVal] * 0.30); 
            } else if (clubNameVal === 'schelkovo') { 
                priceTotal.textContent = Math.floor(schelkovo[cardTypeVal] * 0.30); 
            }
        } else if (targetValue.toUpperCase() !== promotionalСode && priceTotal){
            if (clubNameVal === 'mozaika') { 
                priceTotal.textContent = mozaika[cardTypeVal]; 
            } else if (clubNameVal === 'schelkovo') { 
                priceTotal.textContent = schelkovo[cardTypeVal]; 
            }
        }
    };

    if (promoDiv) {
        promoDiv.addEventListener('input', (event) => {
            targetValue = event.target.value; 
            promo(targetValue,cardTypeVal,clubNameVal); 
        });
    }

    promo(targetValue,cardTypeVal,clubNameVal);

    calcForm.addEventListener('submit', () => {
        setTimeout(() => {
            [...calcForm].forEach(item => {
                if(item.checked && item.name === 'card-type') {
                    cardTypeVal = item.value;
                } else if(item.checked && item.name === 'club-name') {
                    clubNameVal = item.value;
                
                }
            });
            
            if (inputDiv) {
                targetValue = inputDiv.value;
            }
            
            promo(targetValue,cardTypeVal,clubNameVal);
        }, 10);  
    });

};

export default calc;