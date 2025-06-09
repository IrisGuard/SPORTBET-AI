
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Key, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ApiDocs = () => {
  return (
    <div className="min-h-screen bg-sportbet-dark">
      <NavBar />
      
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">API Documentation</h1>
          <p className="text-gray-400 mt-1">Reference guide for SportBet AI API endpoints and integration</p>
          
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/keyvault">
              <Button variant="outline" className="flex items-center gap-2 border-sportbet-light-gray text-white hover:bg-sportbet-gray/50">
                <Key className="h-4 w-4" />
                Key Vault
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        <Tabs defaultValue="rest-api" className="mt-8">
          <TabsList className="w-full justify-start mb-6 bg-sportbet-dark">
            <TabsTrigger value="rest-api" className="flex-1 data-[state=active]:bg-sportbet-blue">REST API</TabsTrigger>
            <TabsTrigger value="websockets" className="flex-1 data-[state=active]:bg-sportbet-blue">WebSockets</TabsTrigger>
            <TabsTrigger value="sdk" className="flex-1 data-[state=active]:bg-sportbet-blue">SDK</TabsTrigger>
            <TabsTrigger value="webhooks" className="flex-1 data-[state=active]:bg-sportbet-blue">Webhooks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rest-api">
            <div className="space-y-8">
              <Card className="bg-sportbet-gray border-sportbet-light-gray">
                <CardHeader>
                  <CardTitle className="text-white">Authentication</CardTitle>
                  <CardDescription className="text-gray-400">
                    API requests require authentication using API keys. You can manage your API keys in the <Link to="/keyvault" className="text-sportbet-blue hover:underline">Key Vault</Link>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-md p-4 text-white font-mono text-sm mb-4">
                    <p>curl -X GET https://api.sportbet-ai.com/predictions \</p>
                    <p>&nbsp;&nbsp;-H "x-api-key: YOUR_API_KEY"</p>
                  </div>
                  
                  <div className="mt-4 bg-gray-800 border border-gray-700 rounded-md p-4">
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-amber-500" />
                      <p className="font-medium text-white">Security Note</p>
                    </div>
                    <p className="mt-1 text-gray-300">Always keep your API keys secure and never expose them in client-side code.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-sportbet-gray border-sportbet-light-gray">
                <CardHeader>
                  <CardTitle className="text-white">Predictions API</CardTitle>
                  <CardDescription className="text-gray-400">
                    Access and filter AI-generated predictions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-sportbet-light-gray">
                        <TableHead className="w-[200px] text-gray-400">Endpoint</TableHead>
                        <TableHead className="text-gray-400">Description</TableHead>
                        <TableHead className="w-[100px] text-gray-400">Method</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-sportbet-light-gray">
                        <TableCell className="font-mono text-sportbet-blue">/predictions</TableCell>
                        <TableCell className="text-gray-300">List available predictions with filtering options</TableCell>
                        <TableCell><Badge className="bg-green-600 hover:bg-green-700">GET</Badge></TableCell>
                      </TableRow>
                      <TableRow className="border-sportbet-light-gray">
                        <TableCell className="font-mono text-sportbet-blue">/predictions/:id</TableCell>
                        <TableCell className="text-gray-300">Get detailed information about a specific prediction</TableCell>
                        <TableCell><Badge className="bg-green-600 hover:bg-green-700">GET</Badge></TableCell>
                      </TableRow>
                      <TableRow className="border-sportbet-light-gray">
                        <TableCell className="font-mono text-sportbet-blue">/predictions/purchase</TableCell>
                        <TableCell className="text-gray-300">Purchase access to a prediction using SBET tokens</TableCell>
                        <TableCell><Badge variant="outline" className="border-blue-500 text-blue-400">POST</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2 text-white">Query Parameters</h4>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-sportbet-light-gray">
                          <TableHead className="w-[150px] text-gray-400">Parameter</TableHead>
                          <TableHead className="text-gray-400">Description</TableHead>
                          <TableHead className="w-[150px] text-gray-400">Example</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-sportbet-light-gray">
                          <TableCell className="font-mono text-sportbet-blue">sport</TableCell>
                          <TableCell className="text-gray-300">Filter by sport type</TableCell>
                          <TableCell className="text-gray-300">football</TableCell>
                        </TableRow>
                        <TableRow className="border-sportbet-light-gray">
                          <TableCell className="font-mono text-sportbet-blue">date</TableCell>
                          <TableCell className="text-gray-300">Filter by date (ISO format)</TableCell>
                          <TableCell className="text-gray-300">2025-05-11</TableCell>
                        </TableRow>
                        <TableRow className="border-sportbet-light-gray">
                          <TableCell className="font-mono text-sportbet-blue">team</TableCell>
                          <TableCell className="text-gray-300">Filter by team name</TableCell>
                          <TableCell className="text-gray-300">Arsenal</TableCell>
                        </TableRow>
                        <TableRow className="border-sportbet-light-gray">
                          <TableCell className="font-mono text-sportbet-blue">limit</TableCell>
                          <TableCell className="text-gray-300">Number of results to return</TableCell>
                          <TableCell className="text-gray-300">20</TableCell>
                        </TableRow>
                        <TableRow className="border-sportbet-light-gray">
                          <TableCell className="font-mono text-sportbet-blue">offset</TableCell>
                          <TableCell className="text-gray-300">Pagination offset</TableCell>
                          <TableCell className="text-gray-300">0</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="websockets">
            <Card className="bg-sportbet-gray border-sportbet-light-gray">
              <CardHeader>
                <CardTitle className="text-white">Real-time Updates</CardTitle>
                <CardDescription className="text-gray-400">
                  Connect to our WebSocket API to receive real-time updates for predictions, matches, and scores.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-md p-4 text-white font-mono text-sm mb-4 overflow-auto">
                  <p>// Connect to the WebSocket server</p>
                  <p>const socket = new WebSocket('wss://api.sportbet-ai.com/ws');</p>
                  <p>&nbsp;</p>
                  <p>// Initialize connection with your API key</p>
                  <p>socket.addEventListener('open', () =&gt; {"{"}</p>
                  <p>&nbsp;&nbsp;socket.send(JSON.stringify({"{"}</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;type: 'authenticate',</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;apiKey: 'YOUR_API_KEY'</p>
                  <p>&nbsp;&nbsp;{"}"}));</p>
                  <p>&nbsp;&nbsp;console.log('Connected to WebSocket server');</p>
                  <p>{"}"});</p>
                  <p>&nbsp;</p>
                  <p>// Listen for live updates</p>
                  <p>socket.addEventListener('message', (event) =&gt; {"{"}</p>
                  <p>&nbsp;&nbsp;const data = JSON.parse(event.data);</p>
                  <p>&nbsp;&nbsp;console.log('Update:', data);</p>
                  <p>{"}"});</p>
                  <p>&nbsp;</p>
                  <p>// Subscribe to specific events</p>
                  <p>socket.send(JSON.stringify({"{"}</p>
                  <p>&nbsp;&nbsp;type: 'subscribe',</p>
                  <p>&nbsp;&nbsp;channel: 'predictions',</p>
                  <p>&nbsp;&nbsp;filters: {"{"}</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;sport: 'football',</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;confidence: 'high'</p>
                  <p>&nbsp;&nbsp;{"}"}</p>
                  <p>{"}"}));</p>
                </div>
                
                <h4 className="font-semibold mb-2 mt-6 text-white">Available Channels</h4>
                <Table>
                  <TableHeader>
                    <TableRow className="border-sportbet-light-gray">
                      <TableHead className="w-[150px] text-gray-400">Channel</TableHead>
                      <TableHead className="text-gray-400">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-sportbet-light-gray">
                      <TableCell className="font-mono text-sportbet-blue">predictions</TableCell>
                      <TableCell className="text-gray-300">New and updated predictions</TableCell>
                    </TableRow>
                    <TableRow className="border-sportbet-light-gray">
                      <TableCell className="font-mono text-sportbet-blue">matches</TableCell>
                      <TableCell className="text-gray-300">Match events and schedule changes</TableCell>
                    </TableRow>
                    <TableRow className="border-sportbet-light-gray">
                      <TableCell className="font-mono text-sportbet-blue">scores</TableCell>
                      <TableCell className="text-gray-300">Live match scores and results</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sdk">
            <Card className="bg-sportbet-gray border-sportbet-light-gray">
              <CardHeader>
                <CardTitle className="text-white">Client SDKs</CardTitle>
                <CardDescription className="text-gray-400">
                  Use our official client libraries to integrate SportBet AI into your applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-sportbet-dark rounded-md">
                    <h4 className="font-semibold mb-2 text-sportbet-blue">JavaScript/TypeScript</h4>
                    <div className="bg-black rounded-md p-4 text-white font-mono text-sm mb-4">
                      <p>npm install @sportbet-ai/client</p>
                      <p>&nbsp;</p>
                      <p>// Initialize the client</p>
                      <p>import {"{"} SportBetClient {"}"} from '@sportbet-ai/client';</p>
                      <p>&nbsp;</p>
                      <p>const client = new SportBetClient({"{"}</p>
                      <p>&nbsp;&nbsp;apiKey: 'YOUR_API_KEY'</p>
                      <p>{"}"});</p>
                      <p>&nbsp;</p>
                      <p>// Get today's predictions</p>
                      <p>client.predictions.list({"{"}</p>
                      <p>&nbsp;&nbsp;date: new Date().toISOString().split('T')[0]</p>
                      <p>{"}"}).then(predictions =&gt; {"{"}</p>
                      <p>&nbsp;&nbsp;console.log(predictions);</p>
                      <p>{"}"});</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-sportbet-dark rounded-md">
                    <h4 className="font-semibold mb-2 text-sportbet-blue">Python</h4>
                    <div className="bg-black rounded-md p-4 text-white font-mono text-sm mb-4">
                      <p>pip install sportbetai</p>
                      <p>&nbsp;</p>
                      <p>from sportbetai import SportBetClient</p>
                      <p>from datetime import date</p>
                      <p>&nbsp;</p>
                      <p>client = SportBetClient(</p>
                      <p>&nbsp;&nbsp;api_key="YOUR_API_KEY"</p>
                      <p>)</p>
                      <p>&nbsp;</p>
                      <p># Get today's predictions</p>
                      <p>predictions = client.predictions.list(</p>
                      <p>&nbsp;&nbsp;date=date.today().isoformat()</p>
                      <p>)</p>
                      <p>&nbsp;</p>
                      <p>print(predictions)</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-4 text-white">SDK Documentation</h4>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-sportbet-light-gray">
                        <TableHead className="w-[150px] text-gray-400">Platform</TableHead>
                        <TableHead className="text-gray-400">Documentation Link</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-sportbet-light-gray">
                        <TableCell className="text-gray-300">JavaScript/TypeScript</TableCell>
                        <TableCell>
                          <a href="#" className="text-sportbet-blue hover:underline">@sportbet-ai/client Documentation</a>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-sportbet-light-gray">
                        <TableCell className="text-gray-300">Python</TableCell>
                        <TableCell>
                          <a href="#" className="text-sportbet-blue hover:underline">sportbetai Python SDK Docs</a>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-sportbet-light-gray">
                        <TableCell className="text-gray-300">Other Languages</TableCell>
                        <TableCell className="text-gray-300">
                          Coming soon (Java, Go, Ruby, PHP)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="webhooks">
            <Card className="bg-sportbet-gray border-sportbet-light-gray">
              <CardHeader>
                <CardTitle className="text-white">Webhooks</CardTitle>
                <CardDescription className="text-gray-400">
                  Receive notifications about prediction events via webhook callbacks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Webhooks allow your application to be notified in real-time when events happen on SportBet AI. 
                  Configure webhooks in the <Link to="/keyvault" className="text-sportbet-blue hover:underline">Key Vault</Link>.
                </p>
                
                <h4 className="font-semibold mb-2 text-white">Event Types</h4>
                <Table>
                  <TableHeader>
                    <TableRow className="border-sportbet-light-gray">
                      <TableHead className="w-[200px] text-gray-400">Event</TableHead>
                      <TableHead className="text-gray-400">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-sportbet-light-gray">
                      <TableCell className="font-mono text-sportbet-blue">prediction.created</TableCell>
                      <TableCell className="text-gray-300">A new prediction has been created</TableCell>
                    </TableRow>
                    <TableRow className="border-sportbet-light-gray">
                      <TableCell className="font-mono text-sportbet-blue">prediction.updated</TableCell>
                      <TableCell className="text-gray-300">An existing prediction has been updated</TableCell>
                    </TableRow>
                    <TableRow className="border-sportbet-light-gray">
                      <TableCell className="font-mono text-sportbet-blue">prediction.result</TableCell>
                      <TableCell className="text-gray-300">A prediction result is available</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="bg-black rounded-md p-4 text-white font-mono text-sm mt-6">
                  <p># Example webhook payload</p>
                  <p>{"{"}</p>
                  <p>&nbsp;&nbsp;"event": "prediction.result",</p>
                  <p>&nbsp;&nbsp;"data": {"{"}</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;"prediction_id": "pred_123456",</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;"match": {"{"}</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"teams": ["Arsenal", "Chelsea"],</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"result": "1-0" </p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;{"}"},</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;"prediction": {"{"}</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"outcome": "home_win",</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"confidence": 0.87,</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"result": "correct"</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</p>
                  <p>&nbsp;&nbsp;{"}"},</p>
                  <p>&nbsp;&nbsp;"timestamp": "2025-05-11T15:30:45Z"</p>
                  <p>{"}"}</p>
                </div>
                
                <div className="mt-6 bg-gray-800 border border-gray-700 rounded-md p-4">
                  <h4 className="font-semibold mb-2 text-white">Security Best Practices</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Always verify the webhook signature using your webhook secret</li>
                    <li>Implement retry logic in case your endpoint is temporarily unavailable</li>
                    <li>Respond with a 2xx status code to acknowledge receipt</li>
                    <li>Process webhook events asynchronously when possible</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default ApiDocs;
