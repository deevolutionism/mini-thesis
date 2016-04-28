var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var express = require("express");
var app = express();//create instance of express
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);//socket io listen on port
var nyt_key = {
	id : '6a28ebb558fde10851695af03590a246:2:74827428'
}

app.use(bodyParser.urlencoded({
    extended: false
}));

//parse application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log('incoming request from ---> ' + ip);
    // Show the target URL that the user just hit
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);
    next();
});

//statically host "/public" folder i.e. index.html will be hosted
//at the '/' = ROOT of our webserverHost. = http://localhost:PORT/
app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log('Simple static server listening at '+url+':'+port);

var PATH_TO_JSON = 'data';
var JSON_FILE_NAME = 'User_Accounts';

/* S E R V E R	R O U T E S */



/* S O C K E T */

io.sockets.on('connection', function (socket) {//open io connection
		console.log('socket connection established');

        //get username and push to database
        socket.on('addnewuser', function(name){
            console.log('recieved username: ' + name);
            data.usernames.push(name);
            io.emit('goToUniverse', name);
        });

        socket.on('newUserPost', function(d){
            //push new post to database
            data.userposts.push(d);
            //add to screen
            io.emit('addUserPostToUniverse',d)
        });

        socket.on('populate', function(user){
            console.log('request to populate recieved');
            io.emit('populateWithData', {data:data, username:user});
        });

        socket.on('requestPreviewPost', function(d){
            //increment post views
            data.userposts[d.id].views++;
            //retrieve OP, text, and number of comments
            var tempdata = {'text':data.userposts[d.id].text,'OP':data.userposts[d.id].OP, 'views':data.userposts[d.id].views,'comments':data.userposts[d.id].comments.length, 'user':d.user};
            //send back to client to populate
            io.emit('previewPost', tempdata);
        });

        socket.on('requestPostContents', function(d){
            console.log(d.user + ' requested post contents');
            var tempdata = {id:d.id, user:d.user, text:data.userposts[d.id].text, OP:data.userposts[d.id].OP, comments:data.userposts[d.id].comments};
            io.emit('postContents',tempdata);
        });

        socket.on('pushNewComment', function(d){
            data.userposts[d.id].comments.push({'user':d.username,'comment':d.comment});
            var comments = data;
            io.emit('updateComments',{id:d.id,jsonobj:data});
        });
});	




















var data = {
  "description" : "list of articles",
  "articles" : [
    {
      "views" : 0,
      "comments" : 0,
      "title" : "Immigration - what you need to know before debating it with your mates",
      "author" : "BBC",
      "source" : "BBC",
      "url" : "http://news.bbc.co.uk/2/hi/americas/4989248.stm",
      "comments" : [
      
      ],
      "article" : "It can feel like immigration is never out of the headlines. # Home Secretary Theresa May has said in a speech that high levels of immigration make it 'impossible to build a cohesive society'. # Meanwhile, Labour leader Jeremy Corbyn thinks we should welcome the opportunities it brings. # It's not a debate that looks set to go away, so we've compiled a list of some things you need to know before discussing immigration. # What the different terms mean # Migrant can be defined in different ways by different studies, as the Migration Observatory points out. # It can refer to people born outside the UK, or those without a British passport, or people who have moved to the UK for at least one year (the UN definition used by the Office for National Statistics, or ONS). # Immigration is the act of people moving into the UK. # Emigration is the act of people moving out of the UK. # Net migration is the difference between people moving into the UK (immigration) and people moving out of the UK (emigration). # Cohesion (as mentioned by Theresa May) is a trickier one, but the Oxford English Dictionary defines it as: 'The action or condition of cohering; cleaving or sticking together.' # The numbers # Net migration was 330,000 in the year ending March 2015, according to latest figures from the Office for National Statistics (ONS). # That was up from 236,000 in the previous 12 months. # Breaking things down... # 2015: 636,000 people immigrated to the UK, while 307,000 left. # 2014: 552,000 people came to the UK, and 316,000 emigrated. # People can overestimate immigrant numbers # If you had to guess the proportion of people in the UK who were born abroad, what would you say? # Well, the average estimate from the public is 21%, according to research from market research company Ipsos Mori. # But in reality, around 13% of the UK population is foreign born, according to official estimates. # Are immigrants affecting jobs and wages? # The Centre for Economic Performance says there is no evidence of immigration having a negative impact on jobs or wages. # In fact, it suggests that immigration is more likely to make wages fairer, because the pressure from highly skilled immigrants can cause the top wages to fall. # The centre's analysis also found little connection between areas with the biggest rises in immigrants and rates of unemployment of UK-born people. # However, a joint Home Office and Business Department report found that immigration 'tended to lower the wages of workers considered to be 'substitutes' to immigrants'. # And in 2009 London School of Economics study concluded that migrants have a 'small, negative impact on average wages'. # Are there any controls around immigration? # Prime Minister David Cameron has pledged several things to try to control immigration. # These include making immigrants wait four years before being able to claim some benefits, removing immigrants who can't find work and speeding up the deportation of foreign criminals. # Mr Cameron has also announced plans to crack down on illegal workers (and their employers) and stop companies from recruiting overseas only. # In April it was announced that visitors from outside the EU who receive treatment in NHS hospitals in England will now be charged 150% of the cost under changes brought in to discourage 'health tourism'. # Non-EU citizens settling in the UK for longer than six months are also being required to pay a 'health surcharge' as part of their visa applications. # "
    },
    {
      "views" : 0,
      "comments" : 0,
      "title" : "America's Immigration Rhetoric Out Of Touch With The Numbers",
      "author" : "LOURDES GARCIA-NAVARRO",
      "source" : "NPR",
      "url" : "http://www.npr.org/2015/10/11/447688060/america-s-immigration-rhetoric-out-of-touch-with-the-numbers",
      "comments" : [
      
      ],
      "article" : "For all of Donald Trump's talk about building a wall to keep out illegal immigrants, most migrants don't come across the Mexican border. In the past few years, Asians have overtaken Hispanics in terms of both legal and illegal migration. A new study by the Pew Research Center says Asians will be the largest immigrant group by 2065. Erika Lee is a professor of Asian-American history at the University of Minnesota and the author of 'The Making of Asian America.' She joins us now from Irvine, Calif. Thanks for being with us. # ERIKA LEE: Thanks for having me. # GARCIA-NAVARRO: So, you know, Americans, not just Donald Trump, don't seem to focus on Asian immigration. We don't see the same backlash that we see towards Latinos and Hispanics. Why do you think that is? # LEE: I think that when Americans think about immigration, the group that comes up is Latinos. And more specifically, Latino immigration is considered a problem - a problem to be solved, that there's too many, that they're draining economic resources, that they're not assimilating. # And this, in fact, is really in contrast to what we know are the facts, that Mexican immigration, in particular, is at a net zero right now. So that means that there are the same number of immigrants from Mexico returning, or leaving the country, than there is coming in, whereas immigration from Asia, and particularly China, and India, is growing. # GARCIA-NAVARRO: And they're coming over here on visas and then just overstaying them. That's how they remain in the country legally. # LEE: That's the pattern, yes. So some of this rhetoric about building walls and increasing border security is a little out of date in terms of the so-called Latino immigration problem. # GARCIA-NAVARRO: Do you think that we don't focus on Asian-Americans as much because they've always been viewed, in a way, as the model minority? Asian-Americans have the highest income. They're the best-educated of any racial group in the United States. # LEE: It's absolutely right, that there are different ways in which different immigrant groups are perceived by Americans. And I think that that model minority message is absolutely part of it, that Asian immigrants are somehow better than other immigrants, that they're doing it right, that they're achieving economically, achieving academically. # Even though we know that the statistics show us that that's actually not the case. There's great diversity in the Asian-American population and labeling them all as model minorities is inaccurate and also misleading. # GARCIA-NAVARRO: Do you think this trend is going to change the debate about immigration in America, illegal immigration in particular? # LEE: I do because already you see that some of the language in the headlines about Asian immigration - Asians on pace to overtake Hispanic surge of immigration - these code words, these terms, they're very anxiety-producing to those of us who study immigration and who know the history because it wasn't so long ago that Asian immigrants were barred from entering the country, couldn't become naturalized citizens, were considered the yellow peril. The model minority idea is actually a rather recent invention. So those of us who know the history are a little concerned the history might repeat itself. # GARCIA-NAVARRO: Erika Lee is the author of 'The Making of Asian America.' Thank you so much. # LEE: Thank you." 
    },
    {
      "views" : 0,
      "comments" : 0,
      "title" : "Elusive crime wave data shows frightening toll of illegal immigrant criminals",
      "author" : "fox news",
      "source" : "FOX",
      "url" : "http://www.foxnews.com/us/2015/09/16/crime-wave-elusive-data-shows-frightening-toll-illegal-immigrant-criminals.html",
      "comments" : [
      
      ],
      "article" : "The federal government can tell you how many 'Native Hawaiian or Other Pacific Islanders' stole a car, the precise number of 'American Indian or Alaska Natives' who were arrested for vagrancy or how many whites were busted for counterfeiting in any given year. But the government agencies that crunch crime numbers are utterly unable -- or unwilling -- to pinpoint for the public how many illegal immigrants are arrested within U.S. borders each year # In the absence of comprehensive data, FoxNews.com examined a patchwork of local, state and federal statistics that revealed a wildly disproportionate number of murderers, rapists and drug dealers are crossing into the U.S. amid the wave of hard-working families seeking a better life. The explosive figures show illegal immigrants are three times as likely to be convicted of murder as members of the general population and account for far more crimes than their 3.5-percent share of the U.S. population would suggest. Critics say it is no accident that local, state and federal governments go to great lengths to keep the data under wraps. # 'There are a lot of reasons states don’t make this information readily available, and there is no clearinghouse of data at high levels,' said former Department of Justice attorney J. Christian Adams, who has conducted exhaustive research on the subject. 'These numbers would expose how serious the problem is and make the government look bad.' # Adams called illegal immigrant crime a 'wave of staggering proportions.' He and other experts noted that the issue has been dragged into the spotlight by a spate of cases in which illegal immigrants with criminal records killed people after being released from custody because of incoherent procedures and a lack of cooperation between local and federal law enforcement officials. The murders, including the July 1 killing of Kathryn Steinle, allegedly by an illegal immigrant in San Francisco, have left grieving loved ones angry and confused, local and federal officials pointing fingers at one another and the voting public demanding secure borders and swift deportation of non-citizen criminals. # 'Every one [of the recent cases] was preventable through better border security and enforcing immigration laws,' said Jessica Vaughan, director of policy studies at the Center for Immigration Studies. 'They should have been sent back to their home country instead of being allowed to stay here and have the opportunity to kill Americans. # A spokesperson for U.S. Customs and Immigration Enforcement told FoxNews.com that comprehensive statistics on illegal immigrant crime are not available from the federal government, and suggested contacting county, state and federal jail and prison systems individually to compose a tally, a process that would encompass thousands of local departments. # FoxNews.com did review reports from immigration reform groups and various government agencies, including the U.S. Census Bureau, U.S. Sentencing Commission, Immigration and Customs Enforcement, the Government Accountability Office, the Bureau of Justice Statistics and several state and county correctional departments. Statistics show the estimated 11.7 million illegal immigrants in the U.S. account for 13.6 percent of all offenders sentenced for crimes committed in the U.S. Twelve percent of murder sentences, 20 percent of kidnapping sentences and 16 percent of drug trafficking sentences are meted out to illegal immigrants. # There are approximately 2.1 million legal or illegal immigrants with criminal convictions living free or behind bars in the U.S., according to ICE's Secure Communities office. Each year, about 900,000 legal and illegal immigrants are arrested, and 700,000 are released from jail, prison, or probation. ICE estimates that there are more than 1.2 million criminal aliens at large in the U.S. # In the most recent figures available, a Government Accountability Office report titled, 'Criminal Alien Statistics,' found there were 55,000 illegal immigrants in federal prison and 296,000 in state and local lockups in 2011. Experts agree those figures have almost certainly risen, although executive orders from the Obama administration may have changed the status of thousands who previously would have been counted as illegal immigrants. # Hundreds of thousands of illegal immigrant criminals are being deported. In 2014, ICE removed 315,943 criminal illegal immigrants nationwide, 85 percent of whom had previously been convicted of a criminal offense. But that same year, ICE released onto U.S. streets another 30,558 criminal illegal immigrants with a combined 79,059 criminal convictions including 86 homicides, 186 kidnappings, and thousands of sexual assaults, domestic violence assaults and DUIs, Vaughan said. As of August, ICE had already released at least 10,246 criminal aliens. # David Inserra, a policy analyst for Homeland Security and Cybersecurity at The Heritage Foundation, said letting illegal immigrants convicted of crimes go free while they await deportation hearings is putting the public at risk. # “While it is not certain how many of these individuals were here illegally, most of these individuals were in deportation proceedings and should have been detained or at least more closely supervised and monitored until their deportation order was finalized and executed,” Inserra said. # Adams opened a rare window into the dearth of public data when he obtained an internal report compiled by the Texas Department of Public Safety and revealed its contents on his Pajamas Media blog. The report showed that between 2008 and 2014, noncitizens in Texas -- a group that includes illegal and legal immigrants -- committed 611,234 crimes, including nearly 3,000 homicides. Adams told FoxNews.com that other states have also closely tracked illegal immigrant crime, especially in the wake of 9/11, but said the statistical sorting “is done behind closed doors.” States closely guard the statistics out of either fear of reprisals from the federal government or out of their leaders' own insistence on downplaying the burden of illegal immigrant crime, he said. # 'There are a lot of reasons states don’t make this information readily available and there is no clearinghouse of data at high levels,' Adams said. 'These numbers would expose how serious the problem is and make the government look bad.' # A smattering of statistics can be teased out of data made public in other states heavily impacted by illegal immigration, although a full picture or apples-to-apples comparison remains elusive. # ■ In Florida, there were 5,061 illegal immigrant inmates in state prison facilities as of June 30, but neither the state Department of Corrections nor the Florida Department of Law Enforcement track the number in county prisons, spokesmen for those agencies told FoxNews.com. # ■ In Illinois, where state prisons house 46,993 inmates, some 3,755 are illegal immigrants, according to Illinois Department of Corrections figures. Once again, state officials do not compile figures for county jails, although a Cook County official estimated that nearly 6 percent were illegal immigrants. # ■ In Arizona, neither state public safety officials nor the governor’s office could produce figures showing the number of criminal illegal immigrants held in county jails, but state prison figures released by the Arizona Department of Corrections show out of 42,758 prisoners held in state facilities in July, about 10.8 percent were illegal immigrants. # ■ In California, there were 128,543 inmates in custody as of Aug. 12, but the state, which has been criticized for its leniency toward illegal immigrants, no longer keeps track of the citizenship status of inmates. As of July 31, 2013, the last time figures were documented, there were as many as 18,000 “foreign-born” citizens in California state prisons of 133,000 incarcerated. The Board of State and Community Corrections provided figures to Fox News from 2014, showing there were 142,000 inmates in 120 county prisons, but while everything from mental health cases to dental and medical appointments are closely tracked, the number of illegal aliens -- or even non citizens -- is not. # “Frankly, this is something every state should track, but they don’t. Not even ICE publishes this much information on offenders and immigration status,” Vaughan said. # Several pro-immigration groups contacted by FoxNews.com declined to comment on the outsize role illegal immigrants play in the U.S. criminal justice system. One group that did insisted that even illegal immigrants provide a net benefit to the U.S. # 'Immigrants, regardless of their legal status, make valuable contributions to our economy as workers, business owners, taxpayers and consumers,' said Erin Oshiro, of Asian Americans Advancing Justice. 'We need an immigration system that that keeps families together, protects workers, and prioritizes due process and human rights.'"
    },
    {
      "views" : 0,
      "comments" : 0,
      "title" : "Trump: Nikki Haley weak on illegal immigration",
      "author" : "Noah Grey",
      "source" : "CNN",
      "url" : "http://www.cnn.com/2016/01/13/politics/donald-trump-nikki-haley/index.html",
      "comments" : [
      ],
      "article" : "Donald Trump struck back at South Carolina Gov. Nikki Haley, after she criticized the Republican presidential front-runner in her State of the Union rebuttal, and added that she's not 'off to a good start' if she wants to be considered for his running mate. # 'She's very weak on illegal immigration,' the billionaire businessman said on Fox News' 'Fox & Friends' on Wednesday. 'I feel very strongly about immigration. She doesn't.' # In her response Tuesday, Haley called for a stop to 'stopping illegal immigration,' but also 'welcoming properly vetted legal immigrants', regardless of their race or religion. # 'No one who is willing to work hard, abide by our laws, and love our traditions should ever feel unwelcome in this country,' she said. # She said Wednesday on CNN that she was addressing Trump when she made a comment on 'the angriest voices' in the Republican Party in her response. # Haley has previously attacked Trump for proposing a temporary ban on admitting Muslim to the U.S. # But Trump said Haley had no problem with him when she needed his money. # 'She certainly has no trouble asking me for campaign contributions,' he said. 'It's sort of interesting to hear her. If I weren't running, she'd probably be in my office asking for money.' # Haley has been mentioned as a potential vice presidential candidate for Republicans, but Trump downplayed her viability. # 'Well considering I'm leading in the polls by a lot, I wouldn't say she's off to a good start' to be his vice presidential candidate, Trump said. 'Whoever I pick is also going to be very strong on illegal immigration.'"
    }
  ],
  "userposts" : [
  ],
  "usernames":[
  ]
}

//{'OP':username, 'text':pt,'views':0,'comments':[{'user':"",'comment':""}]};














