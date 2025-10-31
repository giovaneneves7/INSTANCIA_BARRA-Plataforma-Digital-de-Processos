import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Activity } from "../features/process/domain/models/Activity";

/*
* @author Giovane Neves
*/
const SVGProcessViewer = ({ svgUrl, activities }: { svgUrl: string, activities: Activity[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const activityMap: Record<string, number> = {};
    activities.forEach(activity => {
    activityMap[activity.svg_element_id] = activity.id;
  });

useEffect(() => {
  const loadAndEnhanceSvg = async () => {
    const response = await fetch(svgUrl);
    const svgText = await response.text();

    if (containerRef.current) {
      containerRef.current.innerHTML = svgText;

      const svgElement = containerRef.current.querySelector("svg");
      if (svgElement) {
        svgElement.removeAttribute("width");
        svgElement.removeAttribute("height");
        svgElement.setAttribute("width", "100%");
        svgElement.setAttribute("height", "auto");
        svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svgElement.style.maxWidth = "100%";
        svgElement.style.height = "auto";
        svgElement.style.display = "block";
      }

      Object.keys(activityMap).forEach((svgId) => {
        const el = containerRef.current?.querySelector(`#${svgId}`) as HTMLElement;
        if (el) {
          el.style.cursor = "pointer";
          el.addEventListener("mouseenter", () => {
            el.querySelector("rect")?.setAttribute("stroke", "red");
          });
          el.addEventListener("mouseleave", () => {
            el.querySelector("rect")?.setAttribute("stroke", "#03689A");
          });
          el.addEventListener("click", () => {
            navigate(`/processes/activities/activity/${activityMap[svgId]}`);
          });
        }
      });
    }
  };

  loadAndEnhanceSvg();
}, [svgUrl, navigate]);


return (
  <div className="w-full py-6">
    <div ref={containerRef} className="w-full h-auto" />
  </div>
);

};

export default SVGProcessViewer;
