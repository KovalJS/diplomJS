const calc = () => {
    const calcForm = document.querySelector('#card_order'),
        priceTotal = document.querySelector('#price-total'),
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
    
    let cardTypeVal,
        clubNameVal;
    
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
            
            if (clubNameVal === 'mozaika') { 
                priceTotal.textContent = mozaika[cardTypeVal]; 
            } else if (clubNameVal === 'schelkovo') { 
                priceTotal.textContent = schelkovo[cardTypeVal]; 
            }  
        });

    }); 

    if (clubNameVal === 'mozaika') { 
        priceTotal.textContent = mozaika[cardTypeVal]; 
    } else if (clubNameVal === 'schelkovo') { 
        priceTotal.textContent = mozaika[cardTypeVal]; 
    }   
};

export default calc;