import re

with open("src/components/sections/research-graph/research-graph.tsx", "r") as f:
    content = f.read()

# 1. Update refs
content = content.replace(
    'const [metrics, setMetrics] = useState({ accuracy: 92.4, rounds: 120, noise: 0.05 });',
    '''const metricsRef = useRef({ accuracy: 92.4, rounds: 120, noise: 0.05 });
  const accuracyRef = useRef<HTMLSpanElement>(null);
  const roundsRef = useRef<HTMLSpanElement>(null);
  const noiseRef = useRef<HTMLSpanElement>(null);'''
)

# 2. Main simulation loop (useEffect)
loop_start = content.find('let animationFrameId: number;')
loop_end = content.find('// Handlers for interactive controls')
loop_content = content[loop_start:loop_end]

# Resize Canvas
loop_content = loop_content.replace(
    '''let animationFrameId: number;
    
    // Resize handling
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };''',
    '''let animationFrameId: number | null = null;
    let isVisible = false;
    let dpr = 1;
    
    // Resize handling
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };'''
)

# Init nodes
loop_content = loop_content.replace(
    '''const globalServer = { x: canvas.width / 2, y: canvas.height / 2, radius: 12 };
    let edgeNodes: any[] = [];
    
    const initNodes = () => {
      edgeNodes = [];
      const numNodes = 6;
      const radius = Math.min(canvas.width, canvas.height) * 0.35;
      for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * Math.PI * 2;
        edgeNodes.push({
          id: i,
          x: canvas.width / 2 + Math.cos(angle) * radius,
          y: canvas.height / 2 + Math.sin(angle) * radius,''',
    '''const globalServer = { x: canvas.clientWidth / 2, y: canvas.clientHeight / 2, radius: 12 };
    let edgeNodes: any[] = [];
    
    const initNodes = () => {
      edgeNodes = [];
      const numNodes = 6;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const radius = Math.min(w, h) * 0.35;
      for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * Math.PI * 2;
        edgeNodes.push({
          id: i,
          x: w / 2 + Math.cos(angle) * radius,
          y: h / 2 + Math.sin(angle) * radius,'''
)

# Particle draw
loop_content = loop_content.replace(
    '''ctx.fill();
        // Glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0;''',
    '''ctx.fill();'''
)

# Render function top & Grid
loop_content = loop_content.replace(
    '''const render = (time: number) => {
      // Update canvas center if resized
      globalServer.x = canvas.width / 2;
      globalServer.y = canvas.height / 2;
      if (edgeNodes.length === 0 || Math.abs(edgeNodes[0].x - (canvas.width / 2 + Math.cos(0) * Math.min(canvas.width, canvas.height) * 0.35)) > 5) {
        initNodes();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid background
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 30) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }''',
    '''// Offscreen grid canvas
    const gridCanvas = document.createElement("canvas");
    const gridCtx = gridCanvas.getContext("2d");
    let gridDirty = true;
    
    const handleResize = () => {
      resizeCanvas();
      gridDirty = true;
    };
    window.removeEventListener("resize", resizeCanvas);
    window.addEventListener("resize", handleResize);

    const render = (time: number) => {
      if (!isVisible) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // Update canvas center if resized
      globalServer.x = w / 2;
      globalServer.y = h / 2;
      if (edgeNodes.length === 0 || Math.abs(edgeNodes[0].x - (w / 2 + Math.cos(0) * Math.min(w, h) * 0.35)) > 5) {
        initNodes();
      }

      ctx.clearRect(0, 0, w, h);
      
      if (gridDirty && gridCtx) {
        gridCanvas.width = canvas.width;
        gridCanvas.height = canvas.height;
        gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        gridCtx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        gridCtx.lineWidth = 1;
        for (let i = 0; i < w; i += 30) {
          gridCtx.beginPath(); gridCtx.moveTo(i, 0); gridCtx.lineTo(i, h); gridCtx.stroke();
        }
        for (let i = 0; i < h; i += 30) {
          gridCtx.beginPath(); gridCtx.moveTo(0, i); gridCtx.lineTo(w, i); gridCtx.stroke();
        }
        gridDirty = false;
      }
      ctx.drawImage(gridCanvas, 0, 0, w, h);'''
)

# Metrics update & Intersection Observer
loop_content = loop_content.replace(
    '''// Update metrics smoothly based on params
      setMetrics(prev => {
        let targetAcc = 92.4;
        if (simParams.current.noiseLevel > 0.3) targetAcc -= (simParams.current.noiseLevel * 20);
        if (simParams.current.heterogeneity > 0.3) targetAcc -= 5;
        if (simParams.current.personalization) targetAcc += 4;
        
        return {
          accuracy: prev.accuracy + (targetAcc - prev.accuracy) * 0.05,
          rounds: prev.rounds + (simParams.current.particles.length > 0 ? 0.05 : 0),
          noise: prev.noise + (simParams.current.noiseLevel - prev.noise) * 0.1,
        };
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };''',
    '''// Update metrics smoothly based on params
      let targetAcc = 92.4;
      if (simParams.current.noiseLevel > 0.3) targetAcc -= (simParams.current.noiseLevel * 20);
      if (simParams.current.heterogeneity > 0.3) targetAcc -= 5;
      if (simParams.current.personalization) targetAcc += 4;
      
      metricsRef.current.accuracy += (targetAcc - metricsRef.current.accuracy) * 0.05;
      metricsRef.current.rounds += (simParams.current.particles.length > 0 ? 0.05 : 0);
      metricsRef.current.noise += (simParams.current.noiseLevel - metricsRef.current.noise) * 0.1;

      if (accuracyRef.current) {
        accuracyRef.current.textContent = `${metricsRef.current.accuracy.toFixed(2)}%`;
        accuracyRef.current.className = `font-bold ${metricsRef.current.accuracy < 85 ? "text-destructive" : "text-accent"}`;
      }
      if (roundsRef.current) roundsRef.current.textContent = `${Math.floor(metricsRef.current.rounds)}`;
      if (noiseRef.current) {
        noiseRef.current.textContent = `${(metricsRef.current.noise * 100).toFixed(1)}%`;
        noiseRef.current.className = `font-bold ${metricsRef.current.noise > 0.15 ? "text-destructive" : "text-muted-foreground"}`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      } else if (!isVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }, { threshold: 0.05 });
    
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };'''
)

content = content[:loop_start] + loop_content + content[loop_end:]

# 3. Transitions
content = content.replace('transition-all backdrop-blur-sm', 'transition-colors backdrop-blur-sm')
content = content.replace('transition-all duration-300 min-h-[240px]', 'transition-colors duration-300 min-h-[240px]')
content = content.replace('transition-all duration-150 ease-in-out', 'transition-[opacity,transform,filter] duration-150 ease-in-out')

# 4. JSX refs
content = content.replace(
    '''<span className={cn("font-bold", metrics.accuracy < 85 ? "text-destructive" : "text-accent")}>
                  {metrics.accuracy.toFixed(2)}%
                </span>''',
    '''<span className="font-bold text-accent" ref={accuracyRef}>
                  92.40%
                </span>'''
)
content = content.replace(
    '''<span className="font-bold">{Math.floor(metrics.rounds)}</span>''',
    '''<span className="font-bold" ref={roundsRef}>120</span>'''
)
content = content.replace(
    '''<span className={cn("font-bold", metrics.noise > 0.15 ? "text-destructive" : "text-muted-foreground")}>
                  {(metrics.noise * 100).toFixed(1)}%
                </span>''',
    '''<span className="font-bold text-muted-foreground" ref={noiseRef}>
                  5.0%
                </span>'''
)

with open("src/components/sections/research-graph/research-graph.tsx", "w") as f:
    f.write(content)

