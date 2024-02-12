# Goomba-Craft

Looking into the file format for Minecraft New Nintendo 3DS Edition!

Not sure if this is the same \[file\] format (CDB), but I also have hope that it just may be.
I think I might have discovered this last time we (the team I'm working on things with) looked into it, but I thought it wasn't the right one for some reason.

https://en.wikipedia.org/wiki/Cdb_(software)

The other files possibly could be VDB, or more specifically OpenVDB, which is a database by DreamWorks, for storing volumetric data.
That sounds about right at least, so we might be getting somewhere.

https://www.openvdb.org/
https://en.m.wikipedia.org/wiki/OpenVDB

My feeing is that maybe CDB is used for storing NBT-based data, and maybe VDB is for the more binary-focused things like chunk block data

Found a Node.js implementation of CDB, and decided to migrate it myself up to TypeScript and Promises, looks like it's working so far! Only into the first part of reading things though, so we'll see if it does actually work for the whole thing.

https://github.com/ericnorris/node-cdb
https://github.com/Offroaders123/node-cdb