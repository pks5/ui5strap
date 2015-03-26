onmessage = function(e){
  if ( e.data === "START" ) {
    // Do some computation
    compute()
  }
};

function compute(){
    //Die Funktion wurde nach Hinweisen von Holger Suhr gegenüber der Original-Funktion (s.u.) verbessert.
	//Summenverfahren
	var k;
	var pmax;
	var i;
	var p;
	var psum
	var prim;
	var c;
	var c_wurzel2;

	p = new Array(200);
	psum = new Array(100);

	c = 100000;

	

	//Nur Primzahlen bis zu dieser Groesse muessen summiert werden.
	//(Parallele zum Sieb des Eratosthenes)
	c_wurzel2 = Math.floor(Math.sqrt(c)) + 1;

	p[0] = 2;
	pmax = 0;
	i = 3;
	psum[0] = 0;
	var message = '';
	while (i < c)
	{
		k = 0;
		prim = true;
		while ((k < pmax) && prim && p[k] <= c_wurzel2)
		{
			while (psum[k] < i)
			{
				psum[k] = psum[k] + p[k];
			}

			if (psum[k] == i)
			{
				prim = false;
			}

			k++;
		}

		if (prim)
		{
			message += 'Found prime number: ' + i + "\n";

			if(i%500 === 499){
				self.postMessage({ 
					'type' : 'ACTION', 
					'message' : { 
						'a_modules' : 'ui5strap.AMConsole', 
						'console' : {
							'logType' : 'info', 
							'message' : message
						} 
					}
				});
				message = '';
			}

			pmax++;
			p[pmax] = i;
			psum[pmax]=0;
		}

		i++;
	}

	self.postMessage({ 
					'type' : 'ACTION', 
					'message' : { 
						'a_modules' : 'ui5strap.AMConsole', 
						'console' : {
							'logType' : 'info', 
							'message' : message
						} 
					}
				});

	self.postMessage({ 
					'type' : 'ACTION', 
					'message' : { 
						'a_modules' : 'ui5strap.AMConsole', 
						'console' : {
							'logType' : 'info', 
							'message' : "WORKER FINISHED"
						} 
					}
				});
}
	