"use client"
import { useEffect, useRef, useState, useCallback } from 'react'

interface CityData { n: string; lat: number; lng: number; c: number }
interface NewDot   { name: string; city: string; lat: number; lng: number; labelAlpha: number; pulseR: number; pulseAlpha: number; dotScale: number }
interface Arc      { f: [number,number]; t: [number,number]; prog: number; alpha: number }
interface Pulse    { lat: number; lng: number; r: number; alpha: number }
interface FeedItem { msg: string; isNew: boolean; id: number }

const FALLBACK: CityData[] = [
  { n:'Mumbai',lat:19.07,lng:72.87,c:340 },{ n:'Delhi',lat:28.61,lng:77.20,c:280 },
  { n:'New York',lat:40.71,lng:-74.00,c:210 },{ n:'London',lat:51.50,lng:-0.12,c:195 },
  { n:'Tokyo',lat:35.68,lng:139.69,c:175 },{ n:'Los Angeles',lat:34.05,lng:-118.24,c:130 },
  { n:'Sydney',lat:-33.86,lng:151.20,c:120 },{ n:'Paris',lat:48.85,lng:2.35,c:115 },
  { n:'Dubai',lat:25.20,lng:55.27,c:105 },{ n:'Singapore',lat:1.35,lng:103.81,c:98 },
  { n:'Bangalore',lat:12.97,lng:77.59,c:92 },{ n:'Chicago',lat:41.87,lng:-87.62,c:90 },
  { n:'Shanghai',lat:31.23,lng:121.47,c:88 },{ n:'Toronto',lat:43.65,lng:-79.38,c:87 },
  { n:'Berlin',lat:52.52,lng:13.40,c:76 },{ n:'Bangkok',lat:13.75,lng:100.52,c:70 },
  { n:'São Paulo',lat:-23.55,lng:-46.63,c:68 },{ n:'Seoul',lat:37.56,lng:126.97,c:65 },
  { n:'Amsterdam',lat:52.37,lng:4.90,c:62 },{ n:'Cairo',lat:30.04,lng:31.23,c:48 },
  { n:'Moscow',lat:55.75,lng:37.61,c:55 },{ n:'Lagos',lat:6.52,lng:3.37,c:54 },
  { n:'Pune',lat:18.52,lng:73.85,c:55 },{ n:'Melbourne',lat:-37.81,lng:144.96,c:55 },
  { n:'Istanbul',lat:41.01,lng:28.97,c:58 },
]

function dotColor(c: number) {
  if (c >= 300) return '#0a2a6e'
  if (c >= 150) return '#1a56c4'
  if (c >= 80)  return '#00b4d8'
  if (c >= 40)  return '#48cae4'
  return '#90e0ef'
}
function dotRadius(c: number) { return Math.min(3 + Math.sqrt(c) * 0.55, 13) }

function makeProjFn(W: number, H: number) {
  return (lat: number, lng: number): [number, number] => {
    const x     = ((lng + 180) / 360) * W
    const rad   = (lat * Math.PI) / 180
    const mercN = Math.log(Math.tan(Math.PI / 4 + rad / 2))
    const y     = H / 2 - (H / (2 * Math.PI)) * Math.max(-Math.PI, Math.min(Math.PI, mercN))
    return [x, y]
  }
}

const LAND: [number,number][][] = [
  [[71,-141],[69,-141],[68,-137],[60,-137],[57,-136],[55,-130],[50,-127],[47,-124],[40,-124],[35,-121],[30,-117],[22,-106],[16,-94],[10,-84],[8,-77],[9,-80],[12,-84],[16,-88],[16,-92],[20,-90],[22,-97],[25,-97],[26,-98],[28,-97],[30,-89],[30,-84],[24,-80],[25,-77],[30,-81],[33,-79],[36,-76],[40,-74],[43,-70],[44,-66],[47,-53],[52,-56],[53,-57],[58,-64],[60,-65],[62,-64],[63,-68],[60,-70],[58,-78],[56,-80],[54,-80],[53,-81],[54,-83],[56,-86],[58,-92],[60,-94],[65,-87],[68,-83],[70,-83],[72,-80],[75,-79],[74,-85],[72,-90],[69,-93],[68,-95],[68,-101],[69,-107],[68,-113],[68,-120],[68,-130],[70,-132],[70,-138],[71,-141]],
  [[83,-45],[82,-35],[80,-22],[77,-18],[73,-22],[70,-25],[66,-36],[65,-41],[66,-50],[68,-53],[70,-52],[73,-52],[76,-45],[79,-40],[83,-45]],
  [[12,-72],[11,-74],[8,-77],[6,-77],[2,-78],[0,-78],[-2,-80],[-4,-80],[-5,-35],[-6,-35],[-10,-37],[-13,-38],[-16,-39],[-23,-43],[-26,-48],[-30,-50],[-33,-53],[-38,-58],[-42,-63],[-46,-67],[-50,-69],[-52,-69],[-54,-68],[-54,-66],[-53,-64],[-52,-72],[-50,-74],[-45,-72],[-40,-72],[-38,-72],[-35,-72],[-30,-72],[-20,-70],[-10,-78],[-5,-80],[0,-80],[2,-78],[5,-77],[10,-75],[12,-72]],
  [[71,28],[68,20],[65,14],[63,8],[58,5],[55,8],[54,10],[53,14],[51,2],[50,2],[48,-2],[46,1],[44,5],[43,3],[41,2],[38,-9],[36,-8],[36,-5],[38,0],[39,3],[40,0],[38,0],[37,1],[37,4],[38,9],[38,14],[41,16],[42,18],[44,20],[44,28],[46,28],[46,24],[48,18],[50,18],[53,20],[54,18],[55,14],[56,10],[57,8],[58,7],[60,5],[62,5],[64,8],[65,14],[68,14],[70,18],[71,28]],
  [[58,-5],[56,-6],[54,-8],[52,-10],[51,-5],[51,0],[51,2],[53,0],[54,-1],[55,-2],[56,-3],[57,-4],[58,-5]],
  [[37,10],[37,11],[35,10],[33,12],[30,32],[28,34],[22,37],[15,42],[12,43],[10,44],[8,44],[4,40],[0,40],[-4,40],[-10,38],[-18,36],[-25,33],[-30,30],[-34,26],[-35,20],[-34,18],[-29,17],[-24,15],[-17,12],[-12,14],[-5,10],[0,8],[4,2],[4,-3],[5,-5],[10,-5],[14,-17],[16,-15],[20,-17],[24,-15],[26,-15],[30,-10],[33,-1],[37,10]],
  [[70,30],[68,50],[65,60],[60,60],[55,60],[50,58],[42,50],[38,48],[36,36],[32,36],[28,34],[22,37],[15,42],[12,43],[10,51],[10,57],[12,60],[16,62],[18,67],[20,67],[22,64],[22,60],[25,62],[28,60],[32,62],[35,62],[38,62],[40,55],[42,50],[45,48],[50,46],[50,44],[52,42],[55,37],[56,34],[55,30],[50,30],[48,35],[45,40],[45,44],[48,46],[50,58],[55,60],[60,60],[65,60],[68,50],[70,30]],
  [[28,60],[28,70],[30,70],[28,72],[25,68],[22,68],[20,70],[18,72],[14,74],[10,76],[8,77],[8,80],[10,80],[12,80],[14,80],[16,82],[20,87],[22,88],[24,88],[26,86],[25,85],[26,83],[24,80],[22,80],[20,76],[18,74],[18,72],[20,70],[22,68],[24,68],[26,66],[28,62],[28,60]],
  [[22,100],[18,98],[16,98],[14,100],[12,102],[10,100],[8,100],[4,100],[2,104],[1,104],[2,103],[4,103],[6,102],[8,103],[10,100],[12,100],[14,100],[16,102],[18,104],[20,104],[22,104],[22,100]],
  [[41,140],[40,140],[38,141],[36,137],[34,136],[33,131],[34,130],[35,133],[36,136],[38,140],[40,141],[41,141],[41,140]],
  [[5,95],[4,98],[2,100],[0,101],[-2,102],[-4,104],[-5,105],[-4,107],[-2,107],[0,104],[2,104],[4,100],[5,98],[5,95]],
  [[7,117],[6,116],[4,116],[2,112],[0,110],[-2,108],[-4,114],[-2,116],[0,117],[2,117],[4,117],[6,117],[7,117]],
  [[-14,126],[-14,130],[-12,136],[-14,136],[-15,136],[-16,137],[-16,140],[-18,146],[-22,150],[-26,153],[-30,153],[-34,151],[-38,146],[-38,140],[-37,140],[-36,137],[-33,134],[-32,134],[-32,130],[-30,128],[-26,114],[-22,114],[-18,122],[-14,126]],
  [[-34,172],[-36,174],[-38,176],[-40,176],[-41,175],[-39,174],[-37,175],[-35,174],[-34,172]],
  [[66,-24],[64,-22],[63,-18],[63,-14],[64,-13],[65,-14],[66,-20],[66,-24]],
  [[-12,49],[-16,44],[-20,44],[-24,44],[-25,47],[-24,48],[-20,48],[-16,50],[-12,49]],
  [[18,122],[17,120],[16,120],[14,121],[12,124],[10,124],[10,122],[12,122],[14,122],[16,122],[18,122]],
]

export default function AttendeeMap() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const citiesRef  = useRef<CityData[]>(FALLBACK.map(c => ({ ...c })))
  const newDotsRef = useRef<NewDot[]>([])
  const arcsRef    = useRef<Arc[]>([])
  const pulsesRef  = useRef<Pulse[]>([])
  const frameRef   = useRef(0)
  const animRef    = useRef<number>()
  const feedIdRef  = useRef(100)
  const wRef       = useRef(0)
  const hRef       = useRef(420)

  const [attendees, setAttendees] = useState<number | null>(null)
  const [today,     setToday]     = useState<number | null>(null)
  const [countries, setCountries] = useState<number | null>(null)
  const [cities,    setCities]    = useState<number | null>(null)
  const [feed,      setFeed]      = useState<FeedItem[]>([])
  const [loading,   setLoading]   = useState(true)
  const [dbOk,      setDbOk]      = useState(false)

  // ── Fetch from /api/rsvp/attendees ───────────────────────────────────────
  const fetchStats = useCallback(async () => {
    try {
      const res  = await fetch('/api/rsvp/attendees')
      if (!res.ok) throw new Error(`${res.status}`)
      const data = await res.json()
      setAttendees(data.total     ?? 0)
      setToday(data.todayCount    ?? 0)
      setCountries(data.countries ?? 0)
      setCities(data.cities       ?? 0)
      setDbOk(true)
      if (Array.isArray(data.cityData) && data.cityData.length > 0)
        citiesRef.current = data.cityData
      if (Array.isArray(data.feed) && data.feed.length > 0)
        setFeed(data.feed.map((msg: string, i: number) => ({ msg, isNew: false, id: i })))
    } catch {
      setDbOk(false)
      setAttendees(2847); setToday(12); setCountries(47); setCities(183)
      setFeed(FALLBACK.slice(0,4).map((c,i) => ({ msg:`Someone from ${c.n} just joined`, isNew:false, id:i })))
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchStats() }, [fetchStats])
  useEffect(() => { const id = setInterval(fetchStats, 30_000); return () => clearInterval(id) }, [fetchStats])

  // ── SSE from /api/rsvp/attendees/stream ───────────────────────────────────
  useEffect(() => {
    const es = new EventSource('/api/rsvp/attendees/stream')
    es.onmessage = (e) => {
      if (!e.data || e.data.startsWith(':')) return
      try {
        const p: { name: string; city: string; country: string; lat: number; lng: number } = JSON.parse(e.data)
        const existing = citiesRef.current.find(c => c.n === p.city)
        if (existing) { existing.c += 1 }
        else { citiesRef.current.push({ n: p.city, lat: p.lat, lng: p.lng, c: 1 }) }
        newDotsRef.current.push({ name: p.name, city: p.city, lat: p.lat, lng: p.lng, labelAlpha: 1, pulseR: 5, pulseAlpha: 1, dotScale: 2.5 })
        setAttendees(a => (a ?? 0) + 1)
        setToday(t => (t ?? 0) + 1)
        const msg = `${p.name} from ${p.city}${p.country ? ', '+p.country : ''} just joined`
        setFeed(prev => [{ msg, isNew: true, id: feedIdRef.current++ }, ...prev].slice(0, 6))
      } catch { /* ignore */ }
    }
    es.onerror = () => { /* auto-reconnects */ }
    return () => es.close()
  }, [])

  // ── Canvas loop ───────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    function resize() {
      const W = canvas!.parentElement!.offsetWidth, H = 420
      wRef.current = W; hRef.current = H
      const dpr = window.devicePixelRatio || 1
      canvas!.width = W*dpr; canvas!.height = H*dpr
      canvas!.style.width = `${W}px`; canvas!.style.height = `${H}px`
      ctx.setTransform(dpr,0,0,dpr,0,0)
    }
    resize()

    function animate() {
      const W = wRef.current, H = hRef.current
      const proj = makeProjFn(W, H)
      ctx.clearRect(0, 0, W, H)

      // bg + grid
      ctx.fillStyle = '#0d1b2a'; ctx.fillRect(0,0,W,H)
      ctx.strokeStyle = 'rgba(255,255,255,0.025)'; ctx.lineWidth = 0.5
      for (let i=0;i<=18;i++){ctx.beginPath();ctx.moveTo(i*W/18,0);ctx.lineTo(i*W/18,H);ctx.stroke()}
      for (let i=0;i<=10;i++){ctx.beginPath();ctx.moveTo(0,i*H/10);ctx.lineTo(W,i*H/10);ctx.stroke()}

      // land
      LAND.forEach(poly => {
        ctx.beginPath()
        poly.forEach(([lat,lng],i)=>{const[x,y]=proj(lat,lng);i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)})
        ctx.closePath()
        ctx.fillStyle='#1c3a52';ctx.strokeStyle='#264d6b';ctx.lineWidth=0.7;ctx.fill();ctx.stroke()
      })

      // arcs
      arcsRef.current.forEach(a => {
        const[x1,y1]=a.f,[x2,y2]=a.t
        const mx=(x1+x2)/2,my=Math.min(y1,y2)-Math.abs(x2-x1)*0.25-20
        ctx.beginPath();ctx.moveTo(x1,y1);ctx.quadraticCurveTo(mx,my,x2,y2)
        ctx.strokeStyle=`rgba(0,180,216,${a.alpha*0.3})`;ctx.lineWidth=1;ctx.stroke()
        const t=a.prog
        const bx=(1-t)*(1-t)*x1+2*(1-t)*t*mx+t*t*x2
        const by=(1-t)*(1-t)*y1+2*(1-t)*t*my+t*t*y2
        ctx.beginPath();ctx.arc(bx,by,2.5,0,Math.PI*2)
        ctx.fillStyle=`rgba(144,224,239,${a.alpha})`;ctx.fill()
      })

      // city dots
      citiesRef.current.forEach(c => {
        const[x,y]=proj(c.lat,c.lng)
        const r=dotRadius(c.c),col=dotColor(c.c)
        const g=ctx.createRadialGradient(x,y,0,x,y,r*2.5)
        g.addColorStop(0,col+'40');g.addColorStop(1,'rgba(0,0,0,0)')
        ctx.beginPath();ctx.arc(x,y,r*2.5,0,Math.PI*2);ctx.fillStyle=g;ctx.fill()
        ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2)
        ctx.fillStyle=col;ctx.strokeStyle='rgba(255,255,255,0.25)';ctx.lineWidth=0.7;ctx.fill();ctx.stroke()
        if(c.c>80){ctx.fillStyle='rgba(255,255,255,0.80)';ctx.font='10.5px monospace';ctx.textAlign='left';ctx.fillText(c.n,x+r+5,y+4)}
      })

      // new arrival dots with floating labels
      newDotsRef.current.forEach(d => {
        const[x,y]=proj(d.lat,d.lng)
        ctx.beginPath();ctx.arc(x,y,d.pulseR,0,Math.PI*2)
        ctx.strokeStyle=`rgba(34,197,94,${d.pulseAlpha})`;ctx.lineWidth=2;ctx.stroke()
        const r=Math.max(4,6*d.dotScale*0.3)
        const g=ctx.createRadialGradient(x,y,0,x,y,r*2.5)
        g.addColorStop(0,'#22c55e66');g.addColorStop(1,'rgba(0,0,0,0)')
        ctx.beginPath();ctx.arc(x,y,r*2.5,0,Math.PI*2);ctx.fillStyle=g;ctx.fill()
        ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle='#22c55e';ctx.fill()
        if(d.labelAlpha>0.02){
          const label=`${d.name} · ${d.city}`
          ctx.font='bold 11px monospace'
          const tw=ctx.measureText(label).width
          const px=x-tw/2-8,py=y-34
          ctx.beginPath()
          ;(ctx as any).roundRect?.(px,py,tw+16,22,6)??ctx.rect(px,py,tw+16,22)
          ctx.fillStyle=`rgba(10,22,40,${d.labelAlpha*0.9})`;ctx.fill()
          ctx.strokeStyle=`rgba(34,197,94,${d.labelAlpha*0.7})`;ctx.lineWidth=0.8;ctx.stroke()
          ctx.fillStyle=`rgba(255,255,255,${d.labelAlpha})`;ctx.textAlign='center'
          ctx.fillText(label,x,py+15)
          ctx.beginPath();ctx.moveTo(x,py+22);ctx.lineTo(x,y-r-2)
          ctx.strokeStyle=`rgba(34,197,94,${d.labelAlpha*0.5})`;ctx.lineWidth=0.8;ctx.stroke()
        }
      })

      // background pulses
      pulsesRef.current.forEach(p=>{
        const[x,y]=proj(p.lat,p.lng)
        ctx.beginPath();ctx.arc(x,y,p.r,0,Math.PI*2)
        ctx.strokeStyle=`rgba(34,197,94,${p.alpha})`;ctx.lineWidth=1.5;ctx.stroke()
      })

      // advance frame state
      frameRef.current++
      arcsRef.current.forEach(a=>{a.prog+=0.012;if(a.prog>1){a.prog=0;a.alpha-=0.1}})
      arcsRef.current=arcsRef.current.filter(a=>a.alpha>0)
      pulsesRef.current.forEach(p=>{p.r+=1.2;p.alpha-=0.022})
      pulsesRef.current=pulsesRef.current.filter(p=>p.alpha>0)
      newDotsRef.current.forEach(d=>{d.pulseR+=1.4;d.pulseAlpha=Math.max(0,d.pulseAlpha-0.018);d.labelAlpha=Math.max(0,d.labelAlpha-0.004);d.dotScale=Math.max(1,d.dotScale-0.025)})
      newDotsRef.current=newDotsRef.current.filter(d=>d.labelAlpha>0||d.pulseAlpha>0)

      if(frameRef.current%85===0&&citiesRef.current.length>=2){
        const pick=()=>{const c=citiesRef.current[Math.floor(Math.random()*citiesRef.current.length)];return makeProjFn(wRef.current,hRef.current)(c.lat,c.lng)}
        arcsRef.current.push({f:pick(),t:pick(),prog:0,alpha:1})
      }
      animRef.current=requestAnimationFrame(animate)
    }
    animate()

    const pulseIv=setInterval(()=>{const c=citiesRef.current[Math.floor(Math.random()*citiesRef.current.length)];if(c)pulsesRef.current.push({lat:c.lat,lng:c.lng,r:3,alpha:0.9})},800)
    const ro=new ResizeObserver(resize);ro.observe(canvas.parentElement!)
    return ()=>{if(animRef.current)cancelAnimationFrame(animRef.current);clearInterval(pulseIv);ro.disconnect()}
  },[])

  const LEGEND=[{color:'#90e0ef',label:'Up to 40'},{color:'#48cae4',label:'40–80'},{color:'#00b4d8',label:'80–150'},{color:'#1a56c4',label:'150–300'},{color:'#0a2a6e',label:'300+'},{color:'#22c55e',label:'New RSVP'}]

  return (
    <section className="py-20 px-6 bg-black">
      <h2 className="text-3xl md:text-4xl font-medium text-white text-center mb-10">People joining from around the world</h2>
      <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden" style={{background:'#0d1b2a',border:'0.5px solid rgba(255,255,255,0.08)'}}>

        <div className="flex justify-end px-5 pt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{background:dbOk?'#22c55e':'#f59e0b'}}/>
            <span className="text-xs" style={{color:'rgba(255,255,255,0.3)',fontFamily:'monospace'}}>{dbOk?'live · mongodb':'demo mode'}</span>
          </div>
        </div>

        <div className="grid grid-cols-4" style={{borderBottom:'0.5px solid rgba(255,255,255,0.08)'}}>
          {[
            {val:loading?'…':(attendees??0).toLocaleString(),label:'ATTENDEES'},
            {val:loading?'…':(countries??0),label:'COUNTRIES'},
            {val:loading?'…':(cities??0),label:'CITIES'},
            {val:loading?'…':(today??0),label:'TODAY',green:true},
          ].map((s,i)=>(
            <div key={i} className="p-4" style={{borderRight:i<3?'0.5px solid rgba(255,255,255,0.08)':'none'}}>
              <div className="text-2xl font-medium tabular-nums" style={{color:s.green?'#22c55e':'#fff'}}>{s.val}</div>
              <div className="text-xs mt-1" style={{color:'rgba(255,255,255,0.35)',letterSpacing:'0.08em'}}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 px-5 pt-4 pb-1">
          {LEGEND.map(l=>(
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{background:l.color,border:'1px solid rgba(255,255,255,0.2)'}}/>
              <span className="text-xs" style={{color:'rgba(255,255,255,0.5)'}}>{l.label}</span>
            </div>
          ))}
        </div>

        <canvas ref={canvasRef} className="w-full block"/>

        <div className="px-5 py-4" style={{borderTop:'0.5px solid rgba(255,255,255,0.08)'}}>
          <div className="text-xs mb-2" style={{color:'rgba(255,255,255,0.2)',letterSpacing:'0.1em',fontFamily:'monospace'}}>LIVE FEED</div>
          {feed.slice(0,6).map(item=>(
            <div key={item.id} className="flex items-center gap-3 py-1.5">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:item.isNew?'#22c55e':'rgba(255,255,255,0.2)'}}/>
              <span className="text-sm" style={{color:item.isNew?'rgba(255,255,255,0.85)':'rgba(255,255,255,0.35)'}}>{item.msg}</span>
            </div>
          ))}
        </div>

        <div className="px-5 pb-5">
          <button onClick={fetchStats} className="w-full py-3 text-sm font-medium rounded-xl transition-all hover:bg-white/10"
            style={{background:'rgba(255,255,255,0.04)',border:'0.5px solid rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.4)'}}>
            ↺ Refresh stats
          </button>
        </div>
      </div>
    </section>
  )
}