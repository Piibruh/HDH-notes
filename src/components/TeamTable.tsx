import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const teamMembers = [
  { name: "Kiều Đức Duy", studentId: "22A1201D0073" },
  { name: "Lưu Hương Ly", studentId: "22A1201D0073" },
  { name: "Phạm Đức Long", studentId: "22A1201D0073" },
];

export const TeamTable = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold text-foreground">Họ và tên</TableHead>
            <TableHead className="text-center font-bold text-foreground">Mã sinh viên</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map((member, index) => (
            <TableRow key={index}>
              <TableCell className="text-center font-medium text-accent">
                {member.name}
              </TableCell>
              <TableCell className="text-center font-mono text-muted-foreground">
                {member.studentId}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
