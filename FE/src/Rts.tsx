import { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle} from 'lucide-react';

// Transaction Log Component
const TransactionLog = ({ logs }: any) => {
  return (
    <Card className="mt-4 max-h-60 overflow-y-auto bg-blue-50 shadow-lg">
      <CardHeader className="bg-blue-100 text-blue-800">
        <CardTitle>Transaction Log</CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-gray-500">No transactions yet</p>
        ) : (
          <ul className="space-y-2">
            {logs.map((log: any, index: any) => (
              <li
                key={index}
                className={`p-2 rounded ${
                  log.type === 'ADD'
                    ? 'bg-green-100 text-green-800'
                    : log.type === 'REMOVE'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {log.timestamp}: {log.message}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

// Main Application Component
const TicketSystemApp = () => {
  const [configuration, setConfiguration] = useState({
    totalTickets: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0,
    maxTicketCapacity: 0,
  });

  const [systemStatus, setSystemStatus] = useState({
    isRunning: false,
    currentTickets: 0,
    transactionLogs: [],
  });

  const [validationErrors, setValidationErrors] = useState<any>({});

  const logTransaction = useCallback((type: any, message: any) => {
    setSystemStatus((prev: any) => ({
      ...prev,
      transactionLogs: [
        ...prev.transactionLogs,
        {
          type,
          message,
          timestamp: new Date().toLocaleTimeString(),
        },
      ].slice(-20),
    }));
  }, []);

  const validateConfiguration = () => {
    const errors: any = {};
    if (configuration.totalTickets <= 0) {
      errors.totalTickets = 'Total tickets must be greater than 0';
    }
    if (configuration.ticketReleaseRate <= 0) {
      errors.ticketReleaseRate = 'Ticket release rate must be greater than 0';
    }
    if (configuration.customerRetrievalRate <= 0) {
      errors.customerRetrievalRate = 'Customer retrieval rate must be greater than 0';
    }
    if (configuration.maxTicketCapacity < configuration.totalTickets) {
      errors.maxTicketCapacity = 'Max capacity must be greater than or equal to total tickets';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfigChange = (e: any) => {
    const { name, value } = e.target;
    const parsedValue = value.replace(/[^0-9]/g, '');
    setConfiguration((prev) => ({
      ...prev,
      [name]: parsedValue === '' ? '' : parseInt(parsedValue),
    }));

    if (validationErrors[name]) {
      const newErrors = { ...validationErrors };
      delete newErrors[name];
      setValidationErrors(newErrors);
    }
  };

  const startSystem = async () => {
    if (!validateConfiguration()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configuration),
      });

      if (!response.ok) {
        throw new Error('Failed to start the system');
      }

      const data = await response.json();
      setSystemStatus({
        isRunning: true,
        currentTickets: data.status.currentTickets,
        transactionLogs: [],
      });
      logTransaction('START', 'System started with initial configuration');

      alert("System Started")
    } catch (error) {
      console.error('Error starting the system:', error);
    }
  };

  const stopSystem = async () => {
    try {
      const response = await fetch('http://localhost:5000/stop', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to stop the system');
      }

      const data = await response.json();
      setSystemStatus((prev) => ({
        ...prev,
        isRunning: false,
      }));
      logTransaction('STOP', 'System stopped');

      alert("System Stopped.")
    } catch (error) {
      console.error('Error stopping the system:', error);
    }
  };

  const resetSystem = async () => {
    try {
      const response = await fetch('http://localhost:5000/reset', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to reset the system');
      }

      const data = await response.json();
      setSystemStatus({
        isRunning: false,
        currentTickets: 0,
        transactionLogs: [],
      });
      setConfiguration({
        totalTickets: 0,
        ticketReleaseRate: 0,
        customerRetrievalRate: 0,
        maxTicketCapacity:0,
      });
      logTransaction('RESET', 'System reset to default configuration');

      alert("System has been reset to default.")
    } catch (error) {
      console.error('Error resetting the system:', error);
    }
  };

  useEffect(() => {
    let intervalId: any;
    if (systemStatus.isRunning) {
      intervalId = setInterval(() => {
        setSystemStatus((prev) => {
          const addedTickets = Math.min(
            configuration.ticketReleaseRate,
            configuration.maxTicketCapacity - prev.currentTickets
          );
          const removedTickets = Math.min(
            configuration.customerRetrievalRate,
            prev.currentTickets
          );

          const newTicketCount = prev.currentTickets + addedTickets - removedTickets;

          if (addedTickets > 0) {
            logTransaction('ADD', `${addedTickets} tickets added to the pool`);
          }
          if (removedTickets > 0) {
            logTransaction('REMOVE', `${removedTickets} tickets retrieved by customers`);
          }

          return {
            ...prev,
            currentTickets: newTicketCount,
          };
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [
    systemStatus.isRunning,
    configuration.ticketReleaseRate,
    configuration.customerRetrievalRate,
    configuration.maxTicketCapacity,
    logTransaction,
  ]);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card className="shadow-lg bg-gradient-to-tr from-indigo-50 to-indigo-100">
        <CardHeader className="bg-indigo-100 text-indigo-800">
          <CardTitle>Ticket System Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block mb-2 text-indigo-700">Total Tickets</label>
              <Input
                type="number"
                name="totalTickets"
                value={configuration.totalTickets}
                onChange={handleConfigChange}
                disabled={systemStatus.isRunning}
                className={validationErrors.totalTickets ? 'border-red-500' : ''}
              />
              {validationErrors.totalTickets && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.totalTickets}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-indigo-700">Ticket Release Rate</label>
              <Input
                type="number"
                name="ticketReleaseRate"
                value={configuration.ticketReleaseRate}
                onChange={handleConfigChange}
                disabled={systemStatus.isRunning}
                className={validationErrors.ticketReleaseRate ? 'border-red-500' : ''}
              />
              {validationErrors.ticketReleaseRate && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.ticketReleaseRate}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-indigo-700">Customer Retrieval Rate</label>
              <Input
                type="number"
                name="customerRetrievalRate"
                value={configuration.customerRetrievalRate}
                onChange={handleConfigChange}
                disabled={systemStatus.isRunning}
                className={validationErrors.customerRetrievalRate ? 'border-red-500' : ''}
              />
              {validationErrors.customerRetrievalRate && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.customerRetrievalRate}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-indigo-700">Max Ticket Capacity</label>
              <Input
                type="number"
                name="maxTicketCapacity"
                value={configuration.maxTicketCapacity}
                onChange={handleConfigChange}
                disabled={systemStatus.isRunning}
                className={validationErrors.maxTicketCapacity ? 'border-red-500' : ''}
              />
              {validationErrors.maxTicketCapacity && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.maxTicketCapacity}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={startSystem} disabled={systemStatus.isRunning}>Start System</Button>
          <Button onClick={stopSystem} disabled={!systemStatus.isRunning}>Stop System</Button>
          <Button onClick={resetSystem} disabled={systemStatus.isRunning}>Reset System</Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="bg-gray-100">
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertCircle className="mr-2 h-5 w-5 text-gray-500" />
            <AlertTitle className="text-gray-800">
              {systemStatus.isRunning ? 'System is Running' : 'System is Stopped'}
            </AlertTitle>
            <AlertDescription>
              Current Tickets: {systemStatus.currentTickets}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <TransactionLog logs={systemStatus.transactionLogs} />
    </div>
  );
};

const TicketSystemStatus = () => {
  const [configuration, setConfiguration] = useState({});
  const [systemStatus, setSystemStatus] = useState({});

  useEffect(() => {
      const fetchLatestStatus = async () => {
          try {
              const response = await fetch('http://localhost:5000/latest-status');
              const data = await response.json();
              if (data) {
                  setConfiguration({
                      totalTickets: data.totalTickets,
                      ticketReleaseRate: data.ticketReleaseRate,
                      customerRetrievalRate: data.customerRetrievalRate,
                      maxTicketCapacity: data.maxTicketCapacity,
                  });
                  setSystemStatus({
                      isRunning: data.isRunning,
                      currentTickets: data.currentTickets,
                      transactionLogs: [], // Optionally fetch transaction logs
                  });
              }
          } catch (error) {
              console.error('Error fetching latest status:', error);
          }
      };

      fetchLatestStatus();
  }, []);

  return (
      <div>
          <h1>System Status</h1>
          {/* Render your status information here */}
      </div>
  );
};

export default TicketSystemApp;
