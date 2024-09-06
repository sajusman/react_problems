import { useState } from "react";
import { IoIosFolder } from "react-icons/io";
import { FaRegFile } from "react-icons/fa6";

interface IFile {
  name: string;
}

interface IFolder {
  name: string;
  files?: IFile[];
  folders?: IFolder[];
}

const Folders: IFolder[] = [
  {
    name: "Movies",
    files: [{ name: "Butterfly effect" }, { name: "Narcos the movie" }],
    folders: [
      {
        name: "Justice League",
        folders: [
          {
            name: "Christopher Nolan series",
            files: [{ name: "Batman : The Dark Knight Rises" }],
          },
        ],
        files: [
          { name: "Batman I" },
          { name: "Batman II" },
          { name: "Superman" },
        ],
      },
      {
        name: "Marvel",
        files: [
          { name: "Guardians of galaxy II" },
          { name: "ANT Man" },
          { name: "Black Panther" },
        ],
      },
    ],
  },
  { name: "Home" },
  {
    name: "Documents",
    files: [
      { name: "Degree" },
      { name: "ID Card" },
      { name: "Passport Photo" },
    ],
  },
  { name: "Photos" },
];

const File = ({ name }: IFile) => {
  return (
    <div className="flex gap-2 items-center">
      <FaRegFile />
      <h4>{name}</h4>
    </div>
  );
};

interface IFolderComponent extends IFolder {
  handleOpenFolder: (folderName: string) => void;
  prefix?: string;
  opennedFolders: Set<string>;
}

const Folder = ({
  name,
  files = [],
  folders = [],
  prefix = "",
  opennedFolders,
  handleOpenFolder,
}: IFolderComponent) => {
  const currentDir = `${prefix}/${name}`;
  const hasFileOrFolder = files.length > 0 || folders.length > 0;

  return (
    <div className="flex flex-col">
      <div
        className={`flex gap-2 items-center ${
          hasFileOrFolder ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        onClick={() => {
          if (hasFileOrFolder) handleOpenFolder(currentDir);
        }}
      >
        <IoIosFolder />
        <h4>{name}</h4>
      </div>
      {opennedFolders.has(currentDir) && folders.length > 0 && (
        <div className="flex ml-8 flex-col gap-2">
          {folders.map((folder) => (
            <Folder
              {...folder}
              handleOpenFolder={handleOpenFolder}
              prefix={currentDir}
              opennedFolders={opennedFolders}
            />
          ))}
        </div>
      )}
      {opennedFolders.has(currentDir) && files.length > 0 && (
        <div className="flex ml-2 flex-col">
          {files.map((file) => (
            <File {...file} />
          ))}
        </div>
      )}
    </div>
  );
};

export const FoldersStructure = () => {
  const [opennedFolders, setOpennedFolders] = useState<Set<string>>(
    new Set<string>()
  );

  const handleOpenFolder = (folderName: string) => {
    if (opennedFolders.has(folderName)) opennedFolders.delete(folderName);
    else opennedFolders.add(folderName);
    setOpennedFolders(new Set([...opennedFolders]));
  };

  return (
    <div>
      <h4>Directory list</h4>
      <div className="flex flex-col">
        {Folders.map((folder) => (
          <Folder
            {...folder}
            handleOpenFolder={handleOpenFolder}
            opennedFolders={opennedFolders}
          />
        ))}
      </div>
    </div>
  );
};
