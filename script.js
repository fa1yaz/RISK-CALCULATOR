document.addEventListener('DOMContentLoaded', function() {
    const threatAgentElement = document.getElementById('threat-agent');
    const vulnerabilityElement = document.getElementById('vulnerability');
    const technicalImpactElement = document.getElementById('technical-impact');
    const businessImpactElement = document.getElementById('business-impact');
    const riskLevelElement = document.getElementById('risk-level');
    const riskDescriptionElement = document.getElementById('risk-description');
    const resetButton = document.getElementById('reset-button');
    const generateReportButton = document.getElementById('generate-report-button');
    const reportContainer = document.createElement('div'); // Container for the report
    reportContainer.id = 'report-output';
    document.querySelector('.content').appendChild(reportContainer);

    const vulnerabilities = [
        { name: 'Injection', description: 'Injection flaws occur when untrusted data is sent to an interpreter as part of a command or query. This can include SQL, NoSQL, OS, and LDAP injections.' },
        { name: 'Broken Authentication', description: 'This occurs when application functions related to authentication and session management are implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens.' },
        { name: 'Sensitive Data Exposure', description: 'Many web applications and APIs do not properly protect sensitive data such as financial, healthcare, or personally identifiable information.' },
        { name: 'XML External Entities (XXE)', description: 'These flaws occur when XML input containing a reference to an external entity is processed by a weakly configured XML parser.' },
        { name: 'Broken Access Control', description: 'Restrictions on what authenticated users are allowed to do are often not properly enforced, allowing attackers to exploit these flaws to access unauthorized functionality and/or data.' },
        { name: 'Security Misconfiguration', description: 'Security misconfiguration is the most common issue and typically results from insecure default configurations, incomplete or ad-hoc configurations, and open cloud storage.' },
        { name: 'Cross-Site Scripting (XSS)', description: 'XSS flaws occur whenever an application includes untrusted data in a new web page without proper validation or escaping, or updates an existing web page with user-supplied data using a browser API that can create HTML or JavaScript.' },
        { name: 'Insecure Deserialization', description: 'This flaw leads to remote code execution attacks and can be used to perform attacks including replay attacks, injection attacks, and privilege escalation attacks.' },
        { name: 'Using Components with Known Vulnerabilities', description: 'Components, such as libraries, frameworks, and other software modules, run with the same privileges as the application. If a vulnerable component is exploited, such an attack can facilitate serious data loss or server takeover.' },
        { name: 'Insufficient Logging and Monitoring', description: 'Insufficient logging and monitoring, coupled with missing or ineffective integration with incident response, allows attackers to further attack systems, maintain persistence, pivot to more systems, and tamper, extract, or destroy data.' }
    ];

    function populateVulnerabilityList() {
        const vulnerabilityList = document.getElementById('vulnerability-list');
        vulnerabilityList.innerHTML = '';
        vulnerabilities.forEach(vulnerability => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${vulnerability.name}</strong>: ${vulnerability.description}`;
            vulnerabilityList.appendChild(li);
        });
    }

    function calculateRisk() {
        const threatAgent = parseInt(threatAgentElement.value);
        const vulnerability = parseInt(vulnerabilityElement.value);
        const technicalImpact = parseInt(technicalImpactElement.value);
        const businessImpact = parseInt(businessImpactElement.value);

        if (isNaN(threatAgent) || isNaN(vulnerability) || isNaN(technicalImpact) || isNaN(businessImpact)) {
            riskLevelElement.textContent = '-';
            riskDescriptionElement.textContent = '';
            riskLevelElement.className = '';
            return;
        }

        const likelihood = (threatAgent + vulnerability) / 2;
        const impact = (technicalImpact + businessImpact) / 2;
        const riskLevel = likelihood * impact;
        const { text, className, description, emoji } = calculateRiskText(riskLevel);

        riskLevelElement.textContent = `${text} ${emoji}`;
        riskLevelElement.className = className;
        riskDescriptionElement.textContent = description;
    }

    function calculateRiskText(riskLevel) {
        if (riskLevel <= 5) {
            return { text: 'Low', className: 'low', description: 'Low risk. Continue monitoring.', emoji: '😊' };
        } else if (riskLevel <= 10) {
            return { text: 'Medium', className: 'medium', description: 'Medium risk. Mitigation recommended.', emoji: '😐' };
        } else if (riskLevel <= 15) {
            return { text: 'High', className: 'high', description: 'High risk. Immediate action required.', emoji: '😟' };
        } else {
            return { text: 'Critical', className: 'critical', description: 'Critical risk. Urgent remediation needed.', emoji: '😨' };
        }
    }

    function resetForm() {
        document.getElementById('risk-form').reset();
        riskLevelElement.textContent = '-';
        riskDescriptionElement.textContent = '';
        riskLevelElement.className = '';
        reportContainer.innerHTML = ''; // Clear the report when reset
    }

    function generateReport() {
        reportContainer.innerHTML = `
            <h3>Risk Report</h3>
            <p><strong>Vulnerability Type:</strong> ${document.getElementById('vulnerability-type').value}</p>
            <p><strong>Threat Agent:</strong> ${threatAgentElement.value}</p>
            <p><strong>Vulnerability Factor:</strong> ${vulnerabilityElement.value}</p>
            <p><strong>Technical Impact:</strong> ${technicalImpactElement.value}</p>
            <p><strong>Business Impact:</strong> ${businessImpactElement.value}</p>
            <p><strong>Risk Level:</strong> ${riskLevelElement.textContent}</p>
            <p>${riskDescriptionElement.textContent}</p>
        `;
        reportContainer.style.backgroundColor = '#2C2C2C'; /* Dark background */
        reportContainer.style.padding = '15px';
        reportContainer.style.marginTop = '20px';
        reportContainer.style.borderRadius = '5px';
        reportContainer.style.color = '#ECECEC'; /* Light text */
    }

    populateVulnerabilityList();

    threatAgentElement.addEventListener('change', calculateRisk);
    vulnerabilityElement.addEventListener('change', calculateRisk);
    technicalImpactElement.addEventListener('change', calculateRisk);
    businessImpactElement.addEventListener('change', calculateRisk);
    resetButton.addEventListener('click', resetForm);
    generateReportButton.addEventListener('click', generateReport);
});




