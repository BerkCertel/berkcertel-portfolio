import { Reveal } from "@/components/common/Reveal";
import type { Project } from "@/types/project";

import { ProjectRow } from "./ProjectRow";

/**
 * Project rows (not cards) that rise in one after another. Takes the list from outside so the
 * Projects page can pass a filtered one.
 */
export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <Reveal className="border-t border-line">
      {projects.map((project, index) => (
        <div
          key={project.key}
          className="reveal"
          style={{ "--i": index, "--reveal-duration": "0.8s" } as React.CSSProperties}
        >
          <ProjectRow project={project} index={index} />
        </div>
      ))}
    </Reveal>
  );
}
