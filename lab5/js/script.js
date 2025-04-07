const phoneDatabase = {
    records: [],
    additionalProperties: new Set(['email', 'company', 'position']),
    changeHistory: [],
    
    init() {
        this.loadFromStorage();
        this.updateRecordsSelect();
        this.renderTable();
        this.updatePropertySelect();
        
        document.getElementById('addBtn').addEventListener('click', () => this.addRecord());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearForm());
        document.getElementById('deleteBtn').addEventListener('click', () => this.deleteRecord());
        document.getElementById('showDebtorsBtn').addEventListener('click', () => this.showDebtors());
        document.getElementById('addPropertyBtn').addEventListener('click', () => this.addPropertyToRecord());
        document.getElementById('removePropertyBtn').addEventListener('click', () => this.removePropertyFromAll());
        document.getElementById('showHistoryBtn').addEventListener('click', function() {
            const historySection = document.getElementById('historySection');
            const changeHistoryDiv = document.getElementById('changeHistory');
            
            changeHistoryDiv.innerHTML = '';

            if (this.changeHistory.length === 0) {
                changeHistoryDiv.innerHTML = '<p>История изменений пуста.</p>';
            } else {
                this.changeHistory.forEach(change => {
                    const changeItem = document.createElement('div');
                    changeItem.textContent = change;
                    changeHistoryDiv.appendChild(changeItem);
                });
            }

            historySection.style.display = historySection.style.display === 'none' ? 'block' : 'none';
        }.bind(this));
    },
    
    loadFromStorage() {
        const savedData = localStorage.getItem('phoneDatabase');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            this.records = parsedData.records || [];
            this.additionalProperties = new Set(parsedData.additionalProperties || ['email', 'company', 'position']);
            this.changeHistory = parsedData.changeHistory || [];
        }
    },
    
    saveToStorage() {
        const dataToSave = {
            records: this.records,
            additionalProperties: Array.from(this.additionalProperties),
            changeHistory: this.changeHistory
        };
        localStorage.setItem('phoneDatabase', JSON.stringify(dataToSave));
    },
    
    addRecord() {
        const id = document.getElementById('id').value.trim();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const debt = document.getElementById('debt').value === 'true';
        
        if (!id || !name || !phone || !address) {
            alert('Пожалуйста, заполните все обязательные поля!');
            return;
        }
        
        if (this.records.some(record => record.id === id)) {
            alert('Запись с таким ID уже существует!');
            return;
        }
        
        const newRecord = { id, name, phone, address, debt };
        
        const propertySelect = document.getElementById('propertySelect');
        const propertyValue = document.getElementById('propertyValue').value.trim();
        
        if (propertySelect.value && propertyValue) {
            newRecord[propertySelect.value] = propertyValue;
        }
        
        this.records.push(newRecord);
        this.changeHistory.push(`Добавлена новая запись с ID ${id}`);
        this.saveToStorage();
        this.updateRecordsSelect();
        this.renderTable();
        this.clearForm();
        this.renderChangeHistory();
    },
    
    clearForm() {
        document.getElementById('id').value = '';
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('address').value = '';
        document.getElementById('debt').value = 'false';
        document.getElementById('propertyValue').value = '';
    },
    
    deleteRecord() {
        const select = document.getElementById('recordSelect');
        const selectedId = select.value;
        
        if (!selectedId) {
            alert('Пожалуйста, выберите запись для удаления!');
            return;
        }
        
        this.records = this.records.filter(record => record.id !== selectedId);
        this.changeHistory.push(`Запись с ID ${selectedId} была удалена`);
        this.saveToStorage();
        this.updateRecordsSelect();
        this.renderTable();
        this.renderChangeHistory();
    },
    
    showDebtors() {
        const debtors = this.records.filter(record => record.debt);
        
        if (debtors.length === 0) {
            alert('Нет записей с задолженностью!');
            return;
        }
        
        let message = 'ФИО с задолженностью:\n';
        debtors.forEach(record => {
            message += `- ${record.name}\n`;
        });
        
        alert(message);
    },
    
    updateRecordsSelect() {
        const select = document.getElementById('recordSelect');
        select.innerHTML = '';
        
        if (this.records.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Нет записей';
            select.appendChild(option);
            return;
        }
        
        this.records.forEach(record => {
            const option = document.createElement('option');
            option.value = record.id;
            option.textContent = `${record.id} - ${record.name}`;
            select.appendChild(option);
        });
    },
    
    updatePropertySelect() {
        const select = document.getElementById('propertySelect');
        select.innerHTML = '';
        
        Array.from(this.additionalProperties).forEach(prop => {
            const option = document.createElement('option');
            option.value = prop;
            option.textContent = prop;
            select.appendChild(option);
        });
    },
    
    addPropertyToRecord() {
        const select = document.getElementById('recordSelect');
        const selectedId = select.value;
        const propertyName = document.getElementById('propertySelect').value;
        const propertyValue = document.getElementById('propertyValue').value.trim();
        
        if (!selectedId) {
            alert('Пожалуйста, выберите запись!');
            return;
        }
        
        if (!propertyName || !propertyValue) {
            alert('Пожалуйста, выберите свойство и введите его значение!');
            return;
        }
        
        const record = this.records.find(r => r.id === selectedId);
        if (record) {
            record[propertyName] = propertyValue;
            
            if (!this.additionalProperties.has(propertyName)) {
                this.additionalProperties.add(propertyName);
                this.updatePropertySelect();
            }
            
            this.saveToStorage();
            this.renderTable();
            
            document.getElementById('additionalInfo').innerHTML = `
                <p>Добавлено свойство <strong>${propertyName}</strong> со значением <strong>${propertyValue}</strong> к записи ${record.id}</p>
            `;
        }
    },
    
    removePropertyFromAll() {
        const propertyName = document.getElementById('propertySelect').value;
        
        if (!propertyName) {
            alert('Пожалуйста, выберите свойство для удаления!');
            return;
        }
        
        if (!confirm(`Вы уверены, что хотите удалить свойство "${propertyName}" из всех записей?`)) {
            return;
        }
        
        this.records.forEach(record => {
            if (record.hasOwnProperty(propertyName)) {
                delete record[propertyName];
            }
        });
        
        this.additionalProperties.delete(propertyName);
        this.updatePropertySelect();
        this.saveToStorage();
        this.renderTable();
        
        document.getElementById('additionalInfo').innerHTML = `
            <p>Свойство <strong>${propertyName}</strong> удалено из всех записей</p>
        `;
    },
    
    renderTable() {
        const tbody = document.getElementById('recordsBody');
        tbody.innerHTML = '';
        
        if (this.records.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 6;
            cell.textContent = 'Нет записей';
            row.appendChild(cell);
            tbody.appendChild(row);
            return;
        }
        
        this.records.forEach(record => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${record.id}</td>
                <td>${record.name}</td>
                <td>${record.phone}</td>
                <td>${record.address}</td>
                <td class="${record.debt ? 'debt' : ''}">${record.debt ? 'Да' : 'Нет'}</td>
            `;
            
            const propCell = document.createElement('td');
            let propsText = '';
            
            Array.from(this.additionalProperties).forEach(prop => {
                if (record.hasOwnProperty(prop)) {
                    propsText += `${prop}: ${record[prop]}\n`;
                }
            });
            
            propCell.textContent = propsText || 'Нет дополнительных свойств';
            row.appendChild(propCell);
            tbody.appendChild(row);
        });
    },
    
    renderChangeHistory() {
        const historyContainer = document.getElementById('changeHistory');
        historyContainer.innerHTML = '';
        this.changeHistory.forEach(change => {
            const changeItem = document.createElement('div');
            changeItem.textContent = change;
            historyContainer.appendChild(changeItem);
        });
    }
};

window.addEventListener('DOMContentLoaded', () => phoneDatabase.init());