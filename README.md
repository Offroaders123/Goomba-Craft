# Goomba-Craft

Looking into the file format for Minecraft New Nintendo 3DS Edition!

Not sure if this is the same \[file\] format (CDB), but I also have hope that it just may be.
I think I might have discovered this last time we (the team I'm working on things with) looked into it, but I thought it wasn't the right one for some reason.

https://en.wikipedia.org/wiki/Cdb_(software)

The other files possibly could be VDB, or more specifically OpenVDB, which is a database by DreamWorks, for storing volumetric data.
That sounds about right at least, so we might be getting somewhere.

https://www.openvdb.org/
https://en.m.wikipedia.org/wiki/OpenVDB

My feeing is that maybe CDB is used for storing NBT-based data, and maybe VDB is for the more binary-focused things like chunk block data.

Found a Node.js implementation of CDB, and decided to migrate it myself up to TypeScript and Promises, looks like it's working so far! Only into the first part of reading things though, so we'll see if it does actually work for the whole thing.

https://github.com/ericnorris/node-cdb
https://github.com/Offroaders123/node-cdb

---

### Further learning

Ok, things are actually seeming nice!
Not only are both CDB and VDB both open source (not too fancy in and of itself), but it's also available as plain CLI packages through Homebrew too.

https://formulae.brew.sh/formula/cdb
https://formulae.brew.sh/formula/openvdb

Hmm, tried opening the `.vdb` files with `vdb_print`, but it didn't like it.
Maybe they are all just with the CDB format instead? And it's just a naming thing? It seems to be alright with \[`cdbstats`\] parsing them as well.

Yeah this has a lot of great info on this page:

https://cr.yp.to/cdb/install.html

This is very interesting to me, you're able to make databases out of singular files:

```md
# Manual tests
Create a database from /etc/services:
     ./cdbmake-sv test.cdb test.tmp < /etc/services
Use cdbtest to test the database:
     ./cdbtest < test.cdb
```

`/etc/services` is a text file, for reference.

I don't completely understand what the individual `.cdb` files are for yet, it seems like they could be to archive single files, or possibly multiple? I'm not completely sure.

I'm curious if this has to do with loading the keys as well.

https://en.wikipedia.org/wiki/Hash_table

How does one list out the available keys from the underlying database itself? I don't know what keys it's using, so I don't know how to get specific entries from the database.
Just found this implementation of a similar thing as well, and it already uses promises and adds iterator support as well.
I may fork that one as well, and add TS support to it.

https://github.com/ozomer/node-cdb-64