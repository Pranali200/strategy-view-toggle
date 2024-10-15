const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];

 
const strategyArray = [
    {
    'View': 'Bullish',
    'Value': {
    '24-Apr-2024': ['Bull Call Spread','Bull Put Spread','Bull Put Spread','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy1','Strategy1','Spread-Strategy','Bull Call Spread'],
    
    '02-May-2024': ['Bull Call Spread','Bull Call Spread','Bull Put Spread','Long Call','Long Call','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy2','Strategy1','Strategy2','Bull Call Spread'],
    '09-May-2024': ['Strategy Put','Strategy Call','Strategy Call','Strategy Call','Strategy Put'],
    }
    },
    {
    'View': 'Bearish',
    'Value': {
    '24-Apr-2024': ['Bear Call Spread','Bear Call Spread','Bear Call Spread','Long Put','Long Put','Long Put','Bear Call Spread',],
    '31-May-2024': ['Long Put','Long Put','Long Put','Long Put','Long Put'],
    '21-Jun-2024': ['Strategy3','Strategy3','Bear Put Spread','Strategy3','Long Put','Long Put'],
    }
    },
    {
    'View': 'RangeBound',
    'Value': {
    '24-Apr-2024': ['Short Straddle','Short Strangle','Short Strangle','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy1','Strategy1','Spread-Strategy','Short Straddle'],
    
    '02-May-2024': ['Short Straddle','Short Straddle','Short Strangle','Iron Butterfly','Iron Butterfly','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy2','Strategy1','Strategy2','Short Straddle'],
    '21-Jun-2024': ['Iron Condor','Iron Butterfly','Iron Butterfly','Iron Butterfly','Iron Condor'],
    }
    },
    {
    'View': 'Volatile',
    'Value': {
    '02-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy1','Strategy1','Spread-Strategy','Long Straddle'],
    '09-May-2024': ['Long Straddle','Long Straddle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy2','Strategy1','Strategy2','Long Straddle'],
    '31-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','Long Straddle'],
    }
    }
  ];

  let selectedView = 'Bearish';
  let selectedDate = '25 Apr 2024';
  
  const accordionHeader = document.querySelector('.accordion-header');
  const accordionContent = document.querySelector('.accordion-content');
  const dateList = document.getElementById('dateList');
  const strategyList = document.getElementById('strategyList');
  const emptyState = document.getElementById('emptyState');
  const selectedDateText = document.getElementById('selectedDateText');
  const selectedDateElement = document.getElementById('selectedDate');
  const toggleButtons = document.querySelectorAll('.toggle-button');
  
  // Render date list in accordion
  function renderDateList() {
    dateList.innerHTML = '';
    dateArray.forEach(date => {
      const dateItem = document.createElement('div');
      dateItem.textContent = date;
      dateItem.addEventListener('click', () => {
        selectedDate = date;
        selectedDateElement.textContent = date;
        accordionContent.classList.remove('active');
        renderStrategies();
      });
      dateList.appendChild(dateItem);
    });
  }
  
  // Render strategies based on selected view and date
  function renderStrategies() {
    strategyList.innerHTML = '';
    const strategies = getStrategiesForDate(selectedView, selectedDate);
  
    if (strategies.length === 0) {
      strategyList.style.display = 'none';
      emptyState.style.display = 'block';
      selectedDateText.textContent = selectedDate;
    } else {
      strategyList.style.display = 'block';
      emptyState.style.display = 'none';
      strategies.forEach((strategy, index) => {
        const strategyCount = index + 1; 
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <h4>${strategy}</h4>
          <span>${strategyCount} ${strategyCount > 1 ? 'Strategies' : 'Strategy'}</span>
        `;
        strategyList.appendChild(card);
      });
    }
  }
  
  
  // Toggle date dropdown visibility
  accordionHeader.addEventListener('click', () => {
    accordionContent.classList.toggle('active');
  });
  
  // Get strategies for the selected date and view
  function getStrategiesForDate(view, date) {
    const viewData = strategyArray.find(strategy => strategy.View === view);
    return viewData?.Value[date] || [];
  }
  
  // Event listeners for view toggle buttons
  toggleButtons.forEach(button => {
    button.addEventListener('click', event => {
      toggleButtons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      selectedView = event.target.getAttribute('data-view');
      renderStrategies();
    });
  });
  
  // Initialize page
  renderDateList();
  renderStrategies();

